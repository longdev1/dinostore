import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // được sử dụng để lấy thông tin của route như params...
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.css',
})
export class DetailproductComponent {
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private cart: CartService
  ) {}
  tempQuantity: number = 1;
  idProduct!: number;
  detailProduct: any;
  ngOnInit() {
    const myAPI = 'http://localhost:3000/products';
    this.idProduct = Number(this.route.snapshot.params['id']); // Lấy giá trị tham số có tên là "ID" từ URL
    this.httpClient.get(`${myAPI}/${this.idProduct}`).subscribe((data) => {
      this.detailProduct = data;
    });
  }
  addToCart(id: number) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Mua sản phẩm thành công',
      showConfirmButton: false,
      timer: 1500,
    });
    this.cart.addToCart(id, this.tempQuantity);
  }
}
