import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MyService } from '../../services/my.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-historycart',
  templateUrl: './historycart.component.html',
  styleUrls: ['./historycart.component.css'],
})
export class HistorycartComponent implements OnInit {
  constructor(
    private cart: CartService,
    private service: MyService,
    private router: Router
  ) {}
  emailUser: any;
  infoBill: any;
  idBill: any;
  listCategory: any;

  listIdBill: any;
  detailBill: any;
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      /* lấy tên loại sản phẩm */
      this.service.getListCategory().subscribe((res) => {
        this.listCategory = res;

        /* Kiểm tra bill có email đặt mua */
        this.emailUser = localStorage.getItem('email');
        if (this.emailUser) {
          this.cart.getBill(this.emailUser).subscribe((res) => {
            this.infoBill = res.body;
            console.log(this.infoBill);

            let listId: any = [];
            this.infoBill.forEach((element: any) => {
              listId = [...listId, element];
            });
            this.idBill = listId; // lấy ra các id bill từ id bill có thể xem chi tiết

            /* Lấy ra các idBill */
            if (this.idBill) {
              this.listIdBill = this.idBill;
            }
            /*
            // show các đơn hàng đã mua (cũ)
            // if (this.idBill) {
            //   let detail: any = [];
            //   this.idBill.forEach((id: any) => {
            //     this.cart.getDetailBill(id).subscribe((res: any) => {
            //       detail = [...detail, ...res];
            //       this.detailBill = detail;
            //     });
            //   });
            // }
            */
          });
        }
      });
    }
  }

  // Hàm lấy tên sản phẩm
  getNameCategory(productId: any) {
    if (this.listCategory) {
      let index = this.listCategory.findIndex(
        (cate: any) => cate.id == productId
      );
      if (index !== -1) {
        return this.listCategory[index].nameCate;
      } else {
        return 'Not found';
      }
    } else {
      return 'Category list is not defined';
    }
  }
  viewBill(idBill: any) {
    // this.cart.getDetailBill(idBill).subscribe((res) => {
    //   this.detailBill = res;
    //   console.log(this.detailBill);
    // });
    this.router.navigate(['./lichsudonhang/chitiet', idBill]);
  }
}
