import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LugarService } from '../../services/lugar.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, MatCard, MatCardTitle,MatInputModule, MatCardHeader, MatCardContent, MatFormField,MatLabel,MatCardActions,MatIcon]
})

export class IniciarSesionComponent {
  correo: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private lugaresServicio: LugarService
  ) { }

  onSubmit(): void {
    this.lugaresServicio.obtenerUsuarios().subscribe((usuarios) => {
      if (!usuarios || !Array.isArray(usuarios)) {
        this.mensajeError = 'Error al obtener usuarios';
        return;
      }

      const usuario = usuarios.find((usuario) => usuario.correo === this.correo);

      if (usuario) {
        bcrypt.compare(this.contrasena, usuario.contrasena, (err, result) => {
          if (err) {
            console.error('Error al comparar la contraseña', err);
            this.mensajeError = 'Error al verificar credenciales';
            return;
          }

          if (result) {
            console.log('Usuario autenticado:', usuario);
            const token = `fake-jwt-token.${btoa(JSON.stringify({ role: usuario.rol, exp: Math.floor(Date.now() / 1000) + 3600 }))}.signature`;
            this.authService.iniciarSesion(token, usuario);
            this.router.navigate([usuario.rol === 'administrador' ? '/admin' : '/']);
          } else {
            this.mensajeError = 'Usuario o contraseña incorrectos';
            alert(this.mensajeError);
          }
        });
      } else {
        this.mensajeError = 'Usuario o contraseña incorrectos';
        alert(this.mensajeError);
      }
    });
  }
}
