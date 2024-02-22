import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  constructor(private cart: CartService) {}
  emailUser: any;
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.emailUser = localStorage.getItem('email');
      console.log(this.emailUser);
    }
  }
  onSubmit(form: any) {
    this.cart.createBill(form.value).subscribe((response) => {
      console.log(response);
      console.log(response.body);
      if (response.ok === false) {
        alert(response.statusText);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Bạn đã thanh toán thành công',
          confirmButtonText: 'Đóng',
        });
        let body = response.body;
        let idBill = body.id;
        this.cart.listCartProduct.forEach((item: any) => {
          this.cart.detailBill(idBill, item).subscribe((res) => {
            console.log(res);
          });
        });
      }
    });
    localStorage.removeItem('localCart');
    location.href = '/';
  }
}
