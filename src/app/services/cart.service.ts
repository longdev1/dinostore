import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Icart } from '../models/icart';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; // Thêm import này

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  listCartProduct: Icart[] = [];
  private cartUpdateSubject = new Subject<void>(); // Thêm Subject này

  getCart(id: number) {
    const url = `http://localhost:3000/products`;
    return this.httpClient.get(`${url}/${id}`);
  }

  // Thêm method để lấy Observable của Subject
  getCartUpdateObservable() {
    return this.cartUpdateSubject.asObservable();
  }

  addToCart(idProduct: number, amount: number) {
    const cartData = localStorage.getItem('localCart');
    const parsedCartData = cartData ? JSON.parse(cartData) : [];

    const findIndex = this.listCartProduct.findIndex(
      (item) => item.idProduct === idProduct
    );

    if (findIndex >= 0) {
      this.listCartProduct[findIndex].amountProduct += amount;
      localStorage.setItem('localCart', JSON.stringify(this.listCartProduct));
    } else {
      this.getCart(idProduct).subscribe((data: any) => {
        let priceDiscount =
          data.price - (data.price * (data.discount ? data.discount : 0)) / 100;

        let cartProduct: Icart = {
          idProduct: data.id,
          nameProduct: data.name,
          priceProduct: priceDiscount,
          imageProduct: data.image,
          amountProduct: amount,
          cateProduct: data.idLoai,
          quantity: 1,
        };

        this.listCartProduct.push(cartProduct);
        localStorage.setItem('localCart', JSON.stringify(this.listCartProduct));

        // Gọi next() để thông báo sự thay đổi đến các subscribers
        this.cartUpdateSubject.next();
      });
    }
    console.log(this.listCartProduct);
  }
  removeItem(i: number) {
    this.listCartProduct.splice(i, 1);
    this.cartUpdateSubject.next();
  }
  getCarts() {
    const cartData = localStorage.getItem('localCart');
    this.listCartProduct = cartData ? JSON.parse(cartData) : [];
  }
  getCartProduct() {
    return this.listCartProduct;
  }

  createBill(info: any): Observable<HttpResponse<any>> {
    const url = `http://localhost:3000/bill`;
    return this.httpClient.post<any>(url, info, { observe: 'response' });
  }

  detailBill(id: any, item: Icart) {
    const url = 'http://localhost:3000/detailbill';
    const data = {
      idbill: id,
      idProduct: item.idProduct,
      imageProduct: item.imageProduct,
      nameProduct: item.nameProduct,
      priceProduct: item.priceProduct,
      cateProduct: item.cateProduct,
      amountProduct: item.amountProduct,
    };

    // Add arrow function to define the function body
    return this.httpClient.post(url, data, { observe: 'response' });
  }

  getBill(email: any): Observable<HttpResponse<any>> {
    const url = `http://localhost:3000/bill?email=${email}`;
    return this.httpClient.get<any>(url, { observe: 'response' });
  }

  getDetailBill(id: any) {
    const url = `http://localhost:3000/detailbill?idbill=${id}`;
    return this.httpClient.get(url, id);
  }
}
