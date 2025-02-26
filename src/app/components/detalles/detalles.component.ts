import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugarService } from '../../services/lugar.service';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Lugar } from '../../models/lugar.model';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-detalles',
  standalone: true,
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
  imports: [MatCardModule, CommonModule, NavbarComponent, FormsModule, MatButtonModule,MatIconModule,MatDividerModule,MatListModule,MatFormFieldModule,MatExpansionModule,MatInputModule]
})
export class DetallesComponent implements OnInit {
  lugar!: Lugar;
  nuevoComentario: string = '';
  usuarioActual: string = '';
  nuevaValoracion: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private lugaresService: LugarService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lugaresService.obtenerLugarById(id).subscribe(lugar => this.lugar = lugar);
    }

    const userData = this.authService.obtenerDatosUsuario();
    if (userData) {
      this.usuarioActual = this.authService.obtenerDatosUsuario();
    }
  }

  anadirComentario(): void {
    if (this.authService.estaAutentificado()) {
      const usuario = this.authService.obtenerDatosUsuario();
      const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;


      const nombreUsuarioString = String(nombreUsuario);

      const rating = Number(this.nuevaValoracion);

      if (isNaN(rating)) {
        alert('La puntuación debe ser un número válido.');
        return;
      }
      this.lugaresService.anadirComentarioLugar(this.lugar.id, this.nuevoComentario, rating, nombreUsuarioString).subscribe(
        (updatedSite) => {
          this.lugar = updatedSite;
          this.nuevoComentario = '';
          this.nuevaValoracion = null;
        },
        (error) => {
          console.error('Error al agregar comentario', error);
        }
      );
    } else {
      alert('Por favor, inicie sesión para comentar.');
    }
  }

  goBack() {
    window.history.back();
  }

}
