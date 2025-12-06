import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiServices {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private readonly http: HttpClient) { }

  loginRequest(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'login', {
      username_or_email: data.usernameOrEmail,
      password: data.password
    }, {
      withCredentials: true
    });
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    }, {
      withCredentials: true
    })
  }
}
