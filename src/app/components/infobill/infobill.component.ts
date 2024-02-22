import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { MyService } from '../../services/my.service';

@Component({
  selector: 'app-infobill',
  templateUrl: './infobill.component.html',
  styleUrl: './infobill.component.css',
})
export class InfobillComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cart: CartService,
    private service: MyService
  ) {}
  id: any;
  total: number = 0;
  detailBill: any;
  listCategory: any;
  ngOnInit(): void {
    this.service.getListCategory().subscribe((res) => {
      this.listCategory = res;
      this.id = this.route.snapshot.params['id'];
      this.cart.getDetailBill(this.id).subscribe((res) => {
        this.detailBill = res;

        // Kiểm tra xem this.detailBill có được định nghĩa không
        if (this.detailBill) {
          // Thực hiện vòng lặp forEach chỉ khi this.detailBill đã được định nghĩa
          this.detailBill.forEach((element: any) => {
            this.total += element.priceProduct * element.amountProduct;
          });

          console.log(this.total);
        }
      });
    });
  }
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
}
