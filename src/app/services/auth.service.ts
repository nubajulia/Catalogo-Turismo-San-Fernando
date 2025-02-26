import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private router: Router) {}

  estaAutentificado(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.cerrarSesion();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  obtenerRol(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.rol || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  iniciarSesion(token: string, usuario: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/iniciosesion']);
  }

  obtenerDatosUsuario(): any {
    const usuarioData = localStorage.getItem('usuario');
    return usuarioData ? JSON.parse(usuarioData) : null;
  }

  registrarUsuario(usuario: any): void {
    const existingusuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    existingusuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(existingusuarios));

    const token = this.generarToken(usuario);
    this.iniciarSesion(token, usuario);
  }

  private generarToken(usuario: any): string {
    const payload = {
      usuarioId: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    return btoa(JSON.stringify(payload));
  }
}
