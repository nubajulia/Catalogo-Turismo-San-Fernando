import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from '../navbar/navbar.component';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [CommonModule,FormsModule,MatCardModule,MatInputModule,MatButtonModule,HttpClientModule,MatSelectModule,NavbarComponent]
})
export class RegistroComponent {
  usuario: {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    telefono: string;
    cumpleanos: string;
    genero: string;
    rol: string;
    comunidad: string;
  } = {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      telefono: '',
      cumpleanos: '',
      genero: '',
      rol: 'usuario',
      comunidad: ''
    };

  private apiUrl: string = 'http://localhost:3000/usuarios';
  constructor(private http: HttpClient) { }

  registro(): void {
    if (!this.validarInputs()) {
      return;
    }

    if (!this.usuario.contrasena) {
      alert('La contraseña no puede estar vacía.');
      return;
    }

    const saltRounds = 10;
    bcrypt.hash(this.usuario.contrasena!, saltRounds, (err: Error | null, hashedcontrasena: string | undefined) => {
      if (err) {
        console.error('Error al cifrar la contraseña', err);
        alert('Error al cifrar la contraseña. Inténtalo de nuevo.');
        return;
      }

      if (!hashedcontrasena) {
        console.error('No se pudo generar el hash de la contraseña');
        alert('Error al generar el hash de la contraseña. Inténtalo de nuevo.');
        return;
      }

      this.usuario.contrasena = hashedcontrasena as string;

      this.http.post(this.apiUrl, this.usuario).subscribe(
        (response: any) => {
          console.log('Registro exitoso', response);
          alert('Usuario registrado correctamente.');
        },
        (error: any) => {
          console.error('Error en el registro', error);
          alert('Error en el registro. Inténtalo de nuevo.');
        }
      );
    });
  }

  private validarInputs(): boolean {
    if (!this.usuario.nombre || !this.usuario.apellido || !this.usuario.correo || !this.usuario.contrasena) {
      alert('Completa todos los campos obligatorios.');
      return false;
    }
    if (!this.validarCorreo(this.usuario.correo)) {
      alert('El formato del correo no es válido.');
      return false;
    }
    if (this.usuario.contrasena.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    return true;
  }

  private validarCorreo(correo: string): boolean {
    const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return correoPattern.test(correo);
  }
}
