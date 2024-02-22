import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import moment from 'moment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css',
})
export class ForgotpassComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  user = {
    email: '',
  };
  ngOnInit(): void {}
  onSubmit() {
    let data = this.user;
    console.log(data);
    this.auth.forgotPass(data.email).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Đã gửi mã đến email của bạn.',
          confirmButtonText: 'Đóng',
        });
        var dataUser = JSON.parse(res);
        console.log(`data`, res);
        const expiresAt = moment().add(dataUser.expiresIn, 'day');
        localStorage.setItem('id_token', dataUser.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Không tìm thấy email trong hệ thống',
        });
      }
    );
  }
}
