import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Card } from '../ui/card/card';
import { Title } from '@angular/platform-browser';
import { AuthServices } from '../../services/auth-services';
import { Router, RouterLink } from '@angular/router';
import { ProductServices } from '../../services/product-services';;
import { LucideAngularModule, Menu, Moon, Search, ShoppingBag, ShoppingCart, User } from "lucide-angular";

@Component({
  selector: 'app-home',
  imports: [Card, LucideAngularModule, NgIf, AsyncPipe, NgFor, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home implements OnInit {

  constructor(private title: Title, private auth: AuthServices, private readonly router: Router, private readonly productServices: ProductServices) {
    this.title.setTitle('StyleHub - Clothing and Apparel Shop')
    this.user$ = this.auth.user$;
  }

  user: any = null;
  isLoggedIn = false;
  cards: any = {};
  cartCount = 0;

  onAddToCart(quantity: number) {
    this.cartCount += quantity;
  }


  fetchProducts() {
    this.productServices.fetchAll().subscribe({
      next: (data: any) => {
        this.cards = data;
        console.log(data)
      }
    })
  }

  readonly Search = Search;
  readonly User = User;
  readonly Moon = Moon;
  readonly ShoppingBag = ShoppingBag;
  readonly ShoppingCart = ShoppingCart;
  readonly Menu = Menu;

  mobileMenuVisible = false;
  user$;
  logoutModalVisible = false;

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }


  showLogoutModal() {
    this.logoutModalVisible = true;
  }

  closeModal() {
    this.logoutModalVisible = false;
  }

  confirmLogout() {
    this.auth.clearUser(); // your logout logic
    this.router.navigate(['/auth/sign-in']);
    this.closeModal();
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
    });

    this.fetchProducts();

    if (this.user?.role === 'owner') {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}

