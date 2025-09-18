import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  register(email: string, password: string, nombre: string): Observable<any> {
    const rol = { nombre: 'ROLE_ADMIN' };
    return this.http.post(`${environment.apiUrl}/users`, { email, password, nombre, rol });
  }
  private apiUrl = `${environment.apiUrl}/auth/login`;
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        this.authState.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  authState$(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
