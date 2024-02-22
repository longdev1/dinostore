import { Component, OnInit } from '@angular/core';
import { MyService } from '../../services/my.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css',
})
export class EditproductComponent implements OnInit {
  constructor(
    private myService: MyService,
    private dataService: DataService,
    private router: ActivatedRoute,
    private routerN: Router
  ) {}
  listCategory: any;
  id: any;
  product: any;
  image: any;
  imageUrl!: string;

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.myService.getProduct(this.id).subscribe((res) => {
      this.product = res;
      this.imageUrl = this.product.image;
    });

    this.myService.getListCategory().subscribe((res) => {
      this.listCategory = res;
    });
  }
  async onSubmit(form: any) {
    if (form.valid) {
      setTimeout(() => {
        this.dataService
          .updateProduct(this.id, form.value)
          .subscribe(() => this.routerN.navigate(['/admin/sanpham']));
      }, 2000);
      let imgPath: any = await this.submitPhoto();
      form.value.image = imgPath;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sửa sản phẩm thành công',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }
  // Image
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  fileChoosen(event: any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
    }
  }
  async submitPhoto() {
    let fd = new FormData();
    let imgPath = '';
    if (this.image) {
      fd.append('productImage', this.image, this.image.name);
      imgPath = await fetch('http://localhost:3001/upload/img', {
        method: 'POST',

        body: fd,
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          return result.img;
        })
        .catch((err) => {});
    }
    if (!imgPath) {
      imgPath = 'http://127.0.0.1:3001/uploads/sach.jpg';
    }
    return imgPath;
  }
}
