import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ] // AuthService should NOT be here
})
export class LoginComponent {
  loginForm;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.snackBar.open('Login exitoso', 'Cerrar', { duration: 2000 });
        // Verifica que el token esté en localStorage antes de navegar
        if (this.auth.getToken()) {
          this.router.navigate(['/home']);
        } else {
          this.snackBar.open('No se pudo guardar el token', 'Cerrar', { duration: 3000 });
        }
      },
      error: () => {
        this.snackBar.open('Credenciales inválidas', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
