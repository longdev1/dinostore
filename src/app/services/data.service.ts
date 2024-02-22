import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  addCate(data: any): Observable<any> {
    let url = `http://localhost:3000/category`;
    return this.http.post<any>(url, data);
  }

  deleteCate(id: any) {
    let url = `http://localhost:3000/category/${id}`;
    return this.http.delete(url);
  }

  updateCate(id: any, data: any) {
    let url = `http://localhost:3000/category/${id}`;
    return this.http.put(url, data);
  }

  addProduct(data: any): Observable<any> {
    let url = `http://localhost:3000/products`;
    return this.http.post<any>(url, data);
  }

  deleteProduct(id: any) {
    let url = `http://localhost:3000/products/${id}`;
    return this.http.delete(url);
  }
  updateProduct(id: any, data: any) {
    let url = `http://localhost:3000/products/${id}`;
    return this.http.put(url, data);
  }

  getAmountProduct() {
    let url = `http://localhost:3000/products`;
    return this.http.get(url);
  }

  getAmountCate() {
    let url = `http://localhost:3000/category`;
    return this.http.get(url);
  }

  getAmountAccount() {
    let url = `http://localhost:3000/user`;
    return this.http.get(url);
  }
}
