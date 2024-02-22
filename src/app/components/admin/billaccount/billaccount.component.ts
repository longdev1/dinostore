import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-billaccount',
  templateUrl: './billaccount.component.html',
  styleUrl: './billaccount.component.css',
})
export class BillaccountComponent {
  listAccount: any;
  bill: any;
  constructor(
    private auth: AuthService,
    private cart: CartService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.auth.getAllUsers().subscribe((res) => {
      this.listAccount = res;
      console.log(this.listAccount);
    });
  }
  // Trong BillaccountComponent
  viewBill(id: string) {
    this.route.navigate(['/admin/bill/bill-user', id]);
  }
}
