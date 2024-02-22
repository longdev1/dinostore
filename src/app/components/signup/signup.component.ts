import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private service: AuthService,
    private router: Router,
    private _http: HttpClient
  ) {}

  myForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
    ]),
    phone: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  user = {
    email: '',
    phone: '',
    pass: '',
    role: 1,
  };

  async onSubmit() {
    this.user.email = this.myForm.get('email')?.value;
    this.user.phone = this.myForm.get('phone')?.value;
    this.user.pass = this.myForm.get('pass')?.value;
    let message = 'Trùng Email';
    if (this.myForm.invalid) {
      alert('Vui lòng nhập đầy đủ và đúng định dạng');
      this.myForm.reset();
      return;
    }
    const emailControl = this.myForm.get('email');
    if (emailControl?.hasError('pattern')) {
      return;
    }
    let check = await this.service.register(this.user);
    if (check) {
      this._http
        .post<any>(`http://localhost:3000/user`, this.user)
        .subscribe(() => {
          this.myForm.reset();
        });
      message = 'Thành công';
    }

    return alert(message);
  }
}
