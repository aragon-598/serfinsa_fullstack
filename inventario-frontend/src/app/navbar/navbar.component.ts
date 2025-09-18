import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, MatToolbarModule, MatButtonModule] // AuthService should NOT be here
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }
}
