import { Component } from '@angular/core';
import { LugarService } from '../services/lugar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { NavbarComponent } from "../components/navbar/navbar.component"

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule,FormsModule,MatCardModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule,MatGridListModule,NavbarComponent]
})
export class AdminComponent {
  nuevoLugar = {
    id: '',
    nombre: '',
    descripcion: '',
    localizacion: '',
    imagenUrl: '',
    parrafo1: '',
    parrafo2: '',
    valoracion: [],
    comentarios: [],
    comentarioUsuario: []
  };

  lugares: any[] = [];

  constructor(private lugaresService: LugarService, private snackBar: MatSnackBar) {
    this.cargarLugares();
  }

  anadirnuevoLugar(): void {
    if (this.nuevoLugar.nombre && this.nuevoLugar.descripcion && this.nuevoLugar.localizacion && this.nuevoLugar.imagenUrl && this.nuevoLugar.parrafo1 && this.nuevoLugar.parrafo2) {
      const nuevoLugarId = {
        ...this.nuevoLugar,
        id: uuidv4()
      };
      this.lugaresService.anadirNuevoLugar(nuevoLugarId).subscribe(
        (response) => {
          this.snackBar.open('Lugar añadido con éxito', 'Cerrar', { duration: 3000 });
          this.cargarLugares();
          this.resetForm();
        },
        (error) => {
          this.snackBar.open('Error al añadir el lugar', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', { duration: 3000 });
    }
  }

  cargarLugares(): void {
    this.lugaresService.obtenerLugares().subscribe(lugares => {
      this.lugares = this.lugares;
    });
  }

  resetForm(): void {
    this.nuevoLugar = {
      id: '',
      nombre: '',
      descripcion: '',
      localizacion: '',
      imagenUrl: '',
      parrafo1: '',
      parrafo2: '',
      valoracion: [],
      comentarios: [],
      comentarioUsuario: []
    };
  }
}
