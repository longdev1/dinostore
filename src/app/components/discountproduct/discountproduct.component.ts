import { Component } from '@angular/core';
import { MyService } from '../../services/my.service';
import { Iproduct } from '../../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discountproduct',
  templateUrl: './discountproduct.component.html',
  styleUrl: './discountproduct.component.css',
})
export class DiscountproductComponent {
  constructor(private getService: MyService, private cart: CartService) {}
  listDiscountProduct: Iproduct[] = [];
  ngOnInit() {
    this.getService.getAll().subscribe((data) => {
      this.listDiscountProduct = data.filter((product) => product.discount > 0);
    });
  }
  addToCart(id: number, amount: number) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Đã thêm sản phẩm vào giỏ hàng',
      showConfirmButton: false,
      timer: 1500,
    });
    this.cart.addToCart(id, amount);
  }
}
