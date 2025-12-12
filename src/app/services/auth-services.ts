import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthServices {
  private api = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  loginRequest(data: any): Observable<any> {
    return this.http.post(this.api + 'login', {
      username_or_email: data.usernameOrEmail,
      password: data.password
    }, {
      withCredentials: true
    });
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(this.api + 'register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    }, {
      withCredentials: true
    })
  }
}
