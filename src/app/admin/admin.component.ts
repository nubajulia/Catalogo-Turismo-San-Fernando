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
  nuevoLugar = this.resetLugar();
  lugares: any[] = [];
  editando: boolean = false;

  constructor(private lugaresService: LugarService, private snackBar: MatSnackBar) {
    this.cargarLugares();
  }

  anadirnuevoLugar(): void {
    if (this.validarLugar(this.nuevoLugar)) {
      const lugarConId = { ...this.nuevoLugar, id: uuidv4() };
      this.lugaresService.anadirNuevoLugar(lugarConId).subscribe(
        () => {
          this.snackBar.open('Lugar añadido con éxito', 'Cerrar', { duration: 3000 });
          this.cargarLugares();
          this.nuevoLugar = this.resetLugar();
        },
        () => this.snackBar.open('Error al añadir el lugar', 'Cerrar', { duration: 3000 })
      );
    } else {
      this.snackBar.open('Completa todos los campos.', 'Cerrar', { duration: 3000 });
    }
  }

  cargarLugares(): void {
    this.lugaresService.obtenerLugares().subscribe(lugares => {
      this.lugares = lugares;
    });
  }

  editarLugar(lugar: any): void {
    this.nuevoLugar = { ...lugar };
    this.editando = true;

    const seccion = document.getElementById('editar-lugar');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  }

  guardarEdicion(): void {
    if (this.validarLugar(this.nuevoLugar)) {
      this.lugaresService.actualizarLugar(this.nuevoLugar).subscribe(
        () => {
          this.snackBar.open('Lugar actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.cargarLugares();
          this.cancelarEdicion();
        },
        () => this.snackBar.open('Error al actualizar el lugar', 'Cerrar', { duration: 3000 })
      );
    } else {
      this.snackBar.open('Completa todos los campos.', 'Cerrar', { duration: 3000 });
    }
  }

  eliminarLugar(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este lugar?')) {
      this.lugaresService.eliminarLugar(id).subscribe(
        () => {
          this.snackBar.open('Lugar eliminado', 'Cerrar', { duration: 3000 });
          this.cargarLugares();
        },
        () => this.snackBar.open('Error al eliminar el lugar', 'Cerrar', { duration: 3000 })
      );
    }
  }

  cancelarEdicion(): void {
    this.nuevoLugar = this.resetLugar();
    this.editando = false;
  }

  validarLugar(lugar: any): boolean {
    return lugar.nombre && lugar.descripcion && lugar.localizacion && lugar.imagenUrl && lugar.parrafo1 && lugar.parrafo2;
  }

  resetLugar() {
    return {
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
