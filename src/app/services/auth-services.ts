import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthServices {
  private api = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }


  private userSubject = new BehaviorSubject<any>(this.loadUser());
  user$ = this.userSubject.asObservable();

  private loadUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  isLoggedIn() {
    return !!this.userSubject.value;
  }

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
