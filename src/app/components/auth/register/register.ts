import { NgClass, NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiServices } from '../../../services/api-services';
import { RouterLink } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Eye, LucideAngularModule, EyeClosed } from 'lucide-angular';
import { initModals, initTooltips } from 'flowbite';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgClass, RouterLink, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements AfterViewInit {

  name: string = ''
  email: string = ''
  password: string = ''
  password_confirmation: string = ''
  errors: any = {};
  isLoading: boolean = false;
  year: number = new Date().getFullYear();
  isShowPassword: boolean = false;
  success: any = {};

  readonly Eye = Eye;
  readonly EyeClosed = EyeClosed;

  constructor(private readonly apiServices: ApiServices, private title: Title) {
    this.title.setTitle('StyleHub - Sign up')
  }

  onRegister() {
    this.isLoading = true;

    this.apiServices.registerUser({
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.success = res;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errors = err.error.errors;
      }
    })
  }

  clearError(field: string) {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  ngAfterViewInit(): void {
    initTooltips();
    initModals();
  }
}
