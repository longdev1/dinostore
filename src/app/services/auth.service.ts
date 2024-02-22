//auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private jwtHelper = new JwtHelperService();
  constructor(private _http: HttpClient) {}
  getAllUsers() {
    let url = `http://localhost:3000/user`;
    return this._http.get(url);
  }
  login(email: string = '', pass: string = '') {
    const userInfo = { email: email, pass: pass };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(
      'http://localhost:3001/login',
      JSON.stringify(userInfo),
      { headers: headers, responseType: 'text' }
    );
  }
  forgotPass(email: string = '') {
    const user = { email: email };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(
      `http://localhost:3001/forgot-password?email=${email}`,
      JSON.stringify(user),
      { headers: headers, responseType: 'text' }
    );
  }

  async register(account: any) {
    let url = `http://localhost:3000/user`;
    let getListUser: any;
    let check = true;
    let user = false;
    getListUser = await this.getListUser();
    getListUser.forEach((element: any) => {
      if (element.email == account.email) {
        user = true;
      }
    });
    if (user) {
      check = false;
    }
    return check;
  }
  getUser(id: any) {
    let url = `http://localhost:3000/user/${id}`;
    return this._http.get(url, id);
  }
  async getListUser() {
    let url = `http://localhost:3000/user`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
  }
  checklogin() {
    if (typeof localStorage !== 'undefined') {
      const str = localStorage.getItem('expires_at') || '';
      if (str == '') return false;
      const expiresAt = JSON.parse(str);
      return moment().isBefore(moment(expiresAt));
    } else {
      return false;
    }
  }
  changePass(id: any, email: any, role: any, newpass: any, phone: any) {
    const url = `http://localhost:3000/user/${id}`;
    const body = { email: email, role: role, phone: phone, pass: newpass };
    return this._http.put(url, body);
    // Thực hiện HTTP PUT request với headers
  }

  async resetPass(token: any, pass: any) {
    let check = {
      status: false,
      mess: '',
    };
    if (!(!!token && !this.jwtHelper.isTokenExpired(token))) {
      return (check = {
        status: false,
        mess: 'Đường dẫn hết hạn!',
      });
    }
    const user = this.jwtHelper.decodeToken(token);
    let form = {
      pass: pass,
    };

    await fetch(`http://localhost:3000/user/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        check = {
          status: true,
          mess: 'Đổi mật khẩu thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Đổi mật khẩu thất bại.',
        };
      });
    return check;
  }

  getOneUser(id: any): Observable<HttpResponse<any>> {
    const url = `http://localhost:3000/user/${id}`;
    return this._http.get<any>(url, { observe: 'response' });
  }

  getUserRole(): number | null {
    const roleString = localStorage.getItem('role');
    return roleString ? +roleString : null;
  }

  async AmountProductInCate() {
    let cate = await fetch(`http://localhost:3000/category`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    let listCate: any = [];
    for (const category of cate) {
      console.log(category);

      let amount = await fetch(
        `http://localhost:3000/products?idLoai=${category.id}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result.length);
          return result.length;
        });

      listCate = [
        ...listCate,
        {
          id: category.id,
          name: category.nameCate,
          amount: amount,
        },
      ];
    }
    console.log(listCate);
    return listCate;
  }
}
