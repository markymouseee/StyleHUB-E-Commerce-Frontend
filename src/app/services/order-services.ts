import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  private api = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getOrder(page: number = 1) {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.api}get-orders?page=${page}`, {
      headers: header,
      withCredentials: true
    });
  }

  approveOrder(data: any) {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.api}orders/approve`, {
      order_id: data.id
    }, {
      headers: header,
      withCredentials: true,
    });
  }

  declineOrder(orderId: number) {
    return this.http.post(`${this.api}/orders/${orderId}/decline`, {});
  }

}
