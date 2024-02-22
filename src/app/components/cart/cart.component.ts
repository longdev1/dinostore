import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private cart: CartService) {}
  items: any = this.cart.getCartProduct();

  sum() {
    let total: number = 0;
    this.items.forEach((item: any) => {
      total += item.priceProduct * item.amountProduct;
    });
    return total;
  }

  amount() {
    let amount: number = 0;
    this.items.forEach((item: any) => {
      amount += item.amountProduct;
    });
    return amount;
  }

  handleDelete(i: number) {
    this.cart.removeItem(i);
  }
}
