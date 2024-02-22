import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  listAccount: any;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getAllUsers().subscribe((res) => {
      this.listAccount = res;
      console.log(this.listAccount);
    });
  }
}
