import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(private auth: AuthService, private router: Router) {}
  user = {
    email: '',
    pass: '',
  };
  ngOnInit(): void {}
  onSubmit() {
    let data = this.user;
    console.log(data);
    this.auth.login(data.email, data.pass).subscribe(
      (res) => {
        var dataUser = JSON.parse(res);
        const expiresAt = moment().add(dataUser.expiresIn, 'day');
        localStorage.setItem('email', data.email);
        localStorage.setItem('id', dataUser.id);
        localStorage.setItem('id_token', dataUser.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        this.router.navigateByUrl('/');
        const role = dataUser.role;
        const id = dataUser.id;
        localStorage.setItem('role', dataUser.role);

        console.log('User Role:', role);
        if (role === 0) {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Sai thông tin đăng nhập',
        });
        this.router.navigateByUrl('/dangnhap');
      }
    );
  }
}
