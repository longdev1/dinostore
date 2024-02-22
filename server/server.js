const exp = require("express");
const fs = require("fs"); // đọc key
const bodyParser = require("body-parser"); // đọc nội dung gửi lên dạng post
const jwt = require("jsonwebtoken"); // tạo token
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const nodemailer = require("nodemailer");
const app = exp();
const port = 3001;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Đây là trang home</h1>");
});
app.use("/uploads", exp.static("uploads"));

const axios = require("axios");

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  try {
    const response = await axios.get("http://localhost:3000/user");
    const user = response.data.find(
      (user) => user.email === email && user.pass === pass
    );
    console.log(user);
    if (user) {
      const jwtBearerToken = jwt.sign({ role: user.role }, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: 3,
        subject: user.id.toString(),
      });
      res.status(200).json({
        idToken: jwtBearerToken,
        expiresIn: 3,
        role: user.role,
        id: user.id,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.sendStatus(500);
  }
});

// Image
app.options("/upload/img", cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    cb(null, timestamp + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

app.post(
  "/upload/img",
  upload.fields([{ name: "productImage", maxCount: 1 }]),
  (req, res, next) => {
    console.log(req.files);
    let name = req.files.productImage[0].path;
    let img = "http://localhost:3001/" + name;
    return res.status(201).json({ img: img });
  }
);

// EMAIL
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "okokabc23@gmail.com",
    pass: "potx gjtq vluk rhch",
  },
});

// Secret key for JWT (replace with a secure random key)

// API endpoint for sending forget password email
app.post("/forgot-password", async (req, res) => {
  const email = req.body.email;
  console.log(email);

  // Assume you have a database to store user information
  // Replace this with your own user retrieval logic
  const user = await getUserByEmail(email);
  if (user) {
    // Generate a unique token for the user
    const token = jwt.sign({ email: user.email, id: user.id }, PRIVATE_KEY, {
      expiresIn: "1h",
    });

    // Generate a reset link with the token
    const resetLink = `http://localhost:4200/recovery/${token}`;

    // Save the token in your database or cache (e.g., Redis) for verification

    // Send email
    const mailOptions = {
      from: "okokabc23@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      res.json({ message: "Password reset email sent successfully" });
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Replace this function with your own logic to retrieve user by email
// For example, query your database to find a user by email
// Return user object or null if not found
async function getUserByEmail(email) {
  const response = await fetch(`http://localhost:3000/user?email=${email}`);
  const user = await response.json();
  console.log(`user`, user);
  return user[0];
}

app.listen(port, () => {
  console.log(`Ung dung dang chay voi port ${port}`);
});
