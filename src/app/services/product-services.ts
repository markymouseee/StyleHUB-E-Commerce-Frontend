import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServices {
  private api = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post(this.api + 'store-product', data, {
      headers: header,
      withCredentials: true
    })
  }

  fetchAll(): Observable<any> {
    return this.http.get(this.api + 'get-all-products', {
      withCredentials: true
    })
  }

  fetchProducts(page: number = 1): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get(
      `${this.api}get-products?page=${page}`, {
      headers: header,
      withCredentials: true,
    })
  }
}
