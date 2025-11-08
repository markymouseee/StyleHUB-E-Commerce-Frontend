import { NgClass, NgIf } from '@angular/common';
import { ApiServices } from './../../../services/api-services';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usernameOrEmail: string = '';
  password: string = '';
  isLoading: boolean = false;
  errors: any = {};
  errorMessage: any = {}

  constructor(private readonly apiServices: ApiServices) { }

  onLogin() {
    this.isLoading = true;
    this.apiServices.loginRequest({
      usernameOrEmail: this.usernameOrEmail,
      password: this.password
    }).subscribe(
      response => {
        this.isLoading = false;

        console.log('Full response:', response);

        if (response.status === 'success') {
          console.log(response.message)
        } else {
          console.log(response.message)
        }
      },
      error => {
        this.isLoading = false;
        this.errors = error.error?.errors || {};
        this.errorMessage = error.error?.errors || {};
        console.log(this.errorMessage)
      }
    )
  }

  clearError(field: string) {
    this.errorMessage = {};
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }
}
