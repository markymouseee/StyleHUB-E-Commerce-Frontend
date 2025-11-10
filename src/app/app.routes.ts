import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Home } from './components/home/home';
import { Register } from './components/auth/register/register';
import { OwnerDashboard } from './components/pages/owner-dashboard/owner-dashboard';


export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        component: Login
      },
      {
        path: 'sign-up',
        component: Register
      }
    ]
  },
  {
    path: 'dashboard',
    component: OwnerDashboard
  },
  {
    path: '',
    component: Home,
  },
];
