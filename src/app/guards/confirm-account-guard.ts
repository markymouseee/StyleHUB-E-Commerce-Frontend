import { CanActivateFn } from '@angular/router';

export const confirmAccountGuard: CanActivateFn = (route, state) => {
  return true;
};
