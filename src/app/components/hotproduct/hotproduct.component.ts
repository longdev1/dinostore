import { Component } from '@angular/core';
import { MyService } from '../../services/my.service';
import { Iproduct } from '../../models/iproduct';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
// import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-hotproduct',
  templateUrl: './hotproduct.component.html',
  styleUrl: './hotproduct.component.css',
})
export class HotproductComponent {
  constructor(
    private getService: MyService,
    private cart: CartService // private auth: AuthService
  ) {}
  listHotProduct: Iproduct[] = [];
  ngOnInit() {
    this.getService.getHotProduct().subscribe((data) => {
      this.listHotProduct = data;
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
