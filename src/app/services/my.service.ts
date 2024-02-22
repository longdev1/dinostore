import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { Icate } from '../models/icate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(private httpClient: HttpClient) {}
  getAll() {
    const url = 'http://localhost:3000/products';
    return this.httpClient.get<Iproduct[]>(url);
  }

  getProduct(id: any): Observable<any> {
    const url = `http://localhost:3000/products/${id}`;
    return this.httpClient.get<any>(url);
  }

  getLegoToysLimit() {
    const url = 'http://localhost:3000/products?idLoai=1&_limit=5';
    return this.httpClient.get<Iproduct[]>(url);
  }

  getModelToysLimit() {
    const url = 'http://localhost:3000/products?idLoai=2&_limit=5';
    return this.httpClient.get<Iproduct[]>(url);
  }
  getHotProduct() {
    const hotProduct_url =
      'http://localhost:3000/products?hot=1&_sort=views&_order=asc';
    return this.httpClient.get<Iproduct[]>(hotProduct_url);
  }

  getListCategory() {
    const url = 'http://localhost:3000/category';
    return this.httpClient.get<Icate[]>(url);
  }

  getProductCategory(id: number, pageSize: number = 1, pageNum: number = 1) {
    let url = `http://localhost:3000/products?idLoai=${id}`;

    return this.httpClient.get<any>(url, { observe: 'response' });
  }

  getNameCategory(id: number) {
    const url = `http://localhost:3000/category?id=${id}`;
    return this.httpClient.get<Icate[]>(url);
  }
}
