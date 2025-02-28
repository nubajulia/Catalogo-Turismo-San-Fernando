import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [MatCardModule,MatSnackBarModule, MatToolbarModule, CommonModule]
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  get isAuthenticated(): boolean {
    return this.authService.estaAutentificado();
  }

  get rol(): string | null {
    return this.authService.obtenerRol();
  }

  logout(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['/iniciosesion']);
  }

  goToRegister(): void {
    this.router.navigate(['/registro']);
  }

  addNewSite(): void {
    this.router.navigate(['/anadir-lugar']);
  }
}

