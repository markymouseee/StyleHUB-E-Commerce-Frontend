import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiServices } from '../../../services/api-services';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name: string = ''
  email: string = ''
  password: string = ''
  password_confirmation: string = ''
  errors: any = {};
  isLoading: boolean = false;

  constructor(private readonly apiServices: ApiServices) { }

  onRegister() {
    this.isLoading = true;

    this.apiServices.registerUser({
      name: this.name,
      email: this.email,
    }).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    )
  }

  clearError(field: string) {

  }
}
