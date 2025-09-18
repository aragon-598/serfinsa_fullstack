import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegisterComponent {
  registerForm;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
      return;
    }
    this.loading = true;
    const { email, password, nombre } = this.registerForm.value;
    this.auth.register(
      email ?? '',
      password ?? '',
      nombre ?? ''
    ).subscribe({
      next: () => {
        this.snackBar.open('Usuario registrado con éxito', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackBar.open('Error al registrar usuario', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
