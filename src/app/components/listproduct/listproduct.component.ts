import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { MyService } from '../../services/my.service';
import { Iproduct } from '../../models/iproduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrl: './listproduct.component.css',
})
export class ListproductComponent {
  constructor(private getService: MyService, private cart: CartService) {}

  listProduct: any;
  pageNum: number = 1; // Trang muốn click
  pageSize: number = 6; // Số record muốn hiện ra trong trang
  total: any; // Tổng số lượng record
  listFull: any;
  filterValue: string = '';
  filteredProduct: Iproduct[] = [];
  ngOnInit(): void {
    this.filteredProduct = this.listProduct;
    this.getService.getAll().subscribe((data) => {
      this.listProduct = data;

      this.listFull = this.listProduct;
      this.total = this.listFull.length;

      this.filteredProduct = this.listProduct;
      console.log(this.filteredProduct);
    });
  }

  filter() {
    this.filteredProduct = this.listProduct.filter((product: any) =>
      product.name.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  nextPage(nextPage: number) {
    this.pageNum = nextPage;
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
