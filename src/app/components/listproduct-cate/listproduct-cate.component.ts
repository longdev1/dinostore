import { Component } from '@angular/core';
import { MyService } from '../../services/my.service';
import { Iproduct } from '../../models/iproduct';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listproduct-cate',
  templateUrl: './listproduct-cate.component.html',
  styleUrl: './listproduct-cate.component.css',
})
export class ListproductCateComponent {
  constructor(
    private getServier: MyService,
    private route: ActivatedRoute,
    private cart: CartService
  ) {}
  idCate!: number;
  nameCate!: string;
  listProduct: Iproduct[] = [];

  pageNum: number = 1; // Trang muốn click
  pageSize: number = 4; // Số record muốn hiện ra trong trang
  total: any; // Tổng số lượng record
  listFull: any;
  filterValue: string = '';
  filteredProduct: Iproduct[] = [];
  ngOnInit() {
    this.filteredProduct = this.listProduct;
    this.idCate = Number(this.route.snapshot.params['id']); // lấy id từ url
    this.getServier.getProductCategory(this.idCate).subscribe((data) => {
      this.listProduct = data.body;

      this.listFull = this.listProduct;
      this.total = this.listFull.length;

      this.filteredProduct = this.listProduct;
    });
    this.getServier.getNameCategory(this.idCate).subscribe((data) => {
      this.nameCate = data[0].nameCate;
    });
  }
  conditionFilter = {};

  // Tìm sản phẩm theo từ khóa
  filter() {
    this.filteredProduct = this.listProduct.filter((product) =>
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
