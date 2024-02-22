import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accountmanage',
  templateUrl: './accountmanage.component.html',
  styleUrl: './accountmanage.component.css',
})
export class AccountmanageComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  id: any;
  user: any;
  ngOnInit(): void {
    this.getIdUser();
    this.auth.getUser(this.id).subscribe((res) => {
      this.user = res;
      console.log(`user`, this.user);
    });
  }
  getIdUser() {
    if (typeof localStorage !== 'undefined') {
      this.id = localStorage.getItem('id');
      console.log(this.id);
    }
  }
  onEdit(id: any) {
    return this.router.navigate(['./quanlytaikhoan/doimatkhau', id]);
  }
}
