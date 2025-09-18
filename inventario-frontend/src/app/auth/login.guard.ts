import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Si está autenticado, redirige a /home o /productos
    if (this.auth.isAuthenticated()) {
      return this.router.parseUrl('/home');
    }
    return true;
  }
}
