import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.css',
})
export class ChangepassComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private auth: AuthService,
    private route: Router
  ) {}
  id: any;
  user: any;
  newPassword: string = '';
  oldPassword: string = '';
  email: string = '';
  role: string = '';
  phone: string = '';
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    if (this.id) {
      this.auth.getUser(this.id).subscribe((res) => {
        this.user = res;
        console.log(this.user);
        this.email = this.user.email;
        this.role = this.user.role;
      });
    }
    console.log(`role`, this.role);
    console.log(`email`, this.email);
  }

  onSubmit(form: any) {
    this.oldPassword = form.value.pass1;
    this.newPassword = form.value.pass2;
    this.phone = form.value.phone;
    console.log(form.value);

    if (this.oldPassword && this.newPassword) {
      if (this.user.pass !== this.oldPassword) {
        alert('Mật khẫu cũ không đúng');
      } else {
        this.auth
          .changePass(
            this.id,
            this.email,
            this.role,
            this.newPassword,
            this.phone
          )
          .subscribe((result) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Đổi mật khẩu thành công',
              showConfirmButton: false,
              timer: 1000,
            });
            this.route.navigate(['/dangnhap']);
          });
      }
    }
  }
}
