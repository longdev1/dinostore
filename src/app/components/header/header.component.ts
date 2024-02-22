import { Component, OnInit } from '@angular/core';
import { MyService } from '../../services/my.service';
import { Icate } from '../../models/icate';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Fix 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit {
  constructor(
    private getService: MyService,
    private cart: CartService,
    private auth: AuthService
  ) {}

  cartItem: number = 0;
  listCate: Icate[] = [];
  ngOnInit() {
    this.getService.getListCategory().subscribe((data) => {
      this.listCate = data;
      console.log(this.cartItem); // This may show the old value
    });

    // Subscribe to the cart update observable
    this.cart.getCartUpdateObservable().subscribe(() => {
      // Calculate the total number of items in the cart
      this.cartItem = this.cart
        .getCartProduct()
        .reduce((total, item) => total + item.quantity, 0);

      console.log(this.cartItem); // Log the updated value here
    });

    // this.statusLogin = this.auth.checklogin();
  }
  logout() {
    this.auth.logout();
  }
  statusLogin() {
    return this.auth.checklogin();
  }
  getNameUser() {
    return localStorage.getItem('email');
  }
}
