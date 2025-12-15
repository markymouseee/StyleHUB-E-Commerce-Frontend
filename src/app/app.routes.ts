import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Home } from './components/home/home';
import { Register } from './components/auth/register/register';
import { adminGuard } from './guards/admin-guard';
import { noAuthGuard } from './guards/no-auth-guard';
import { NotFound } from './components/not-found/not-found';
import { AdminHome } from './components/admin/admin-home/admin-home';
import { Products } from './components/admin/products/products';
import { Orders } from './components/admin/orders/orders';


export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    children: [
      { path: 'sign-in', component: Login },
      { path: 'sign-up', component: Register }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: AdminHome },
      { path: 'products', component: Products },
      { path: 'orders', component: Orders }
    ]
  },
  {
    path: '',
    component: Home
  },
  {
    path: '**',
    component: NotFound
  }
];

