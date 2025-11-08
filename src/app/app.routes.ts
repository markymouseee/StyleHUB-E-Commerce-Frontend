import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Home } from './components/home/home';
import { Register } from './components/auth/register/register';


export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'sign-in',
    component: Login
  },
  {
    path: 'sign-up',
    component: Register
  }

];
