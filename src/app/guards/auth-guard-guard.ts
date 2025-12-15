import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);

  if (user?.role == 'owner') {
    router.navigate(['/admin/dashboard']);
    return true;
  }

  if (user?.role == 'customer') {
    router.navigate(['/']);
    return true;
  }

  return false;
};
