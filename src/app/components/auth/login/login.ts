import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { ApiServices } from '../../../services/api-services';
import { EyeClosed, Eye, LucideAngularModule } from 'lucide-angular';
import { initTooltips } from 'flowbite';

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
    private readonly apiServices: ApiServices,
    private readonly title: Title
  ) {
    this.title.setTitle('StyleHub - Sign in');
  }

  onLogin() {
    this.isLoading = true;

    this.apiServices.loginRequest({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Full response:', response);

        console.log(response.message);
      },
      error: (error) => {
        this.isLoading = false;
        this.errors = error.error?.errors || {};
        this.errorMessage = error.error?.errors || {};
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
  }
}
