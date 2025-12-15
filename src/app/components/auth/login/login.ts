import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { AuthServices } from '../../../services/auth-services';
import { EyeClosed, Eye, LucideAngularModule } from 'lucide-angular';
import { initModals, initTooltips } from 'flowbite';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  usernameOrEmail = '';
  password = '';
  isLoading = false;
  errors: any = {};
  errorMessage: any = {};
  isPasswordShow: boolean = false;
  year: number = new Date().getFullYear();
  showTip: boolean = false;

  readonly EyeClosed = EyeClosed;
  readonly EyeOpen = Eye;

  constructor(
    private readonly authServices: AuthServices,
    private readonly title: Title,
    private readonly router: Router
  ) {
    this.title.setTitle('StyleHub - Sign in');
    const state = history.state;

    if (state?.message) {
      this.errorMessage.message = state.message;

      history.replaceState({}, document.title);
    }

  }

  onLogin() {
    this.isLoading = true;
    this.errorMessage = {}

    this.authServices.loginRequest({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        window.location.reload();
      },
      error: (error) => {
        this.isLoading = false;
        this.errors = error.error?.errors || {};
        this.errorMessage = error.error.message || {};

        console.log(error)
      }
    });
  }

  clearError(field: string) {
    delete this.errors[field];
    this.errorMessage = {};
  }

  togglePassword() {
    this.isPasswordShow = !this.isPasswordShow;
  }

  ngOnInit(): void {
    initTooltips();
    initModals();
  }
}
