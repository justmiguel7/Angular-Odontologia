import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const recepcionistaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rol = authService.getRole(); // recupera el rol del JWT o del storage

  if (rol === 'RECEPCIONISTA') {
    return true;
  } else {
    router.navigate(['/']); // si no es admin, lo manda al login o a donde quieras
    return false;
  }
};
