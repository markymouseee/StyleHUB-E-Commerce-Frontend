import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private api = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  addToCart(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.api + 'cart/add', data, {
      headers: headers,
      withCredentials: true
    })
  }

  fetchCart(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user')!);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.get(this.api + 'cart/items/' + user.id, {
      headers: headers,
      withCredentials: true
    });
  }

  updateQuantity(productId: number, quantity: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.put(`${this.api}cart/update/${productId}`, { quantity }, {
      headers: headers,
      withCredentials: true
    });
  }

  removeItem(productId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.delete(`${this.api}cart/remove/${productId}`, {
      headers: headers,
      withCredentials: true
    });
  }

  checkOut(data: any): Observable<any> {
    const userRaw = JSON.parse(localStorage.getItem('user')!);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.post(`${this.api}cart/checkout`, {
      user_id: userRaw.id,
      address: data.address
    }, {
      headers: headers,
      withCredentials: true
    })
  }

  getCount(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.api + 'get-cart-count', {
      headers: headers,
      withCredentials: true
    })
  }
}
