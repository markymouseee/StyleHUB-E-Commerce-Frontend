import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = localStorage.getItem('user');

  if (!raw) {
    return router.createUrlTree(['/auth/sign-in']);
  }

  const user = JSON.parse(raw);

  // 🔴 ADJUST THIS LINE BASED ON YOUR STORAGE
  const role =
    user.role ??
    user.user?.role ??
    user.data?.role;

  if (role !== 'owner') {
    return router.createUrlTree(['/']);
  }

  return true;
};
