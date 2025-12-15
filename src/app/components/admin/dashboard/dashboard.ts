import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BarChart2, Home, LayoutDashboard, LogOut, LucideAngularModule, Menu, Moon, Package, ShoppingBag, ShoppingCart, Users } from 'lucide-angular';
import { AuthServices } from '../../../services/auth-services';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, LucideAngularModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  readonly ShoppingBag = ShoppingBag;
  readonly Package = Package;
  readonly ShoppingCart = ShoppingCart;
  readonly Users = Users;
  readonly BarChart2 = BarChart2;
  readonly LogOut = LogOut;
  readonly Menu = Menu;
  readonly Moon = Moon;
  readonly Home = Home;

  sidebarOpen = false;
  darkMode = false;
  user: any = {};
  logoutModalVisible = false;
  constructor(private auth: AuthServices, private readonly router: Router) {
    this.user = this.auth.getCurrentUser();
  }

  confirmLogout() {
    this.auth.clearUser(); // your logout logic
    this.router.navigate(['/auth/sign-in']);
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  showLogoutModal() {
    this.logoutModalVisible = true;
  }

  closeModal() {
    this.logoutModalVisible = false;
  }

  ngOnInit(): void {

  }
}

