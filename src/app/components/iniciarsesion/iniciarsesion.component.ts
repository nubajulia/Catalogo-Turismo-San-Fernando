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
        console.error(this.mensajeError);
        return;
      }

      const usuario = usuarios.find((usuario) => usuario.correo === this.correo);

      if (usuario) {
        console.log('Usuario encontrado:', usuario);

        const result = bcrypt.compareSync(this.contrasena, usuario.contrasena);

        if (result) {
          console.log('Autenticación exitosa, usuario:', usuario);

          const token = `fake-jwt-token.${btoa(JSON.stringify({ rol: usuario.rol, exp: Math.floor(Date.now() / 1000) + 3600 }))}.signature`;
          this.authService.iniciarSesion(token, usuario);

          console.log('Rol del usuario:', usuario.rol);

          if (usuario.rol === 'administrador') {
            console.log('Redirigiendo al panel de administración...');
            this.router.navigate(['/admin']);
          } else {
            console.log('Redirigiendo al inicio...');
            this.router.navigate(['/']);
          }
        } else {
          this.mensajeError = 'Usuario o contraseña incorrectos';
          console.warn(this.mensajeError);
          alert(this.mensajeError);
        }
      } else {
        this.mensajeError = 'Usuario o contraseña incorrectos';
        console.warn(this.mensajeError);
        alert(this.mensajeError);
      }
    }, (error) => {
      console.error('Error al obtener usuarios desde el servicio', error);
      this.mensajeError = 'Hubo un problema al conectar con el servidor';
    });
  }
}
