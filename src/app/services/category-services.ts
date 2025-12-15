import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryServices {
  private api = environment.apiUrl;


  constructor(private readonly http: HttpClient) { }

  addCategory(data: any) {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post(this.api + 'store-category', {
      name: data.name,
      description: data.description
    },
      {
        headers: header,
        withCredentials: true
      }
    )
  }

  fetchCategories() {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get(this.api + 'get-categories', {
      headers: header,
      withCredentials: true
    })
  }

  deleteCategory(id: any) {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.delete(this.api + 'delete-category/' + id, {
      headers: header,
      withCredentials: true
    }
    )
  }
}
