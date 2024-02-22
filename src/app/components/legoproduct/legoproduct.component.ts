import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { MyService } from '../../services/my.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-legoproduct',
  templateUrl: './legoproduct.component.html',
  styleUrl: './legoproduct.component.css',
})
export class LegoproductComponent {
  constructor(private getService: MyService, private cart: CartService) {}
  listProduct: Iproduct[] = [];
  ngOnInit() {
    this.getService.getLegoToysLimit().subscribe((data) => {
      this.listProduct = data;
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
