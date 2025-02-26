import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LugarService } from '../../services/lugar.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})

export class ComentariosComponent implements OnInit, OnDestroy {
  comentarios: { comentario: string; usuario: string }[] = [];
  indiceComentarioActual = 0;
  intervaloId: any;
  subscription!: Subscription;

  constructor(private lugaresServices: LugarService) {}

  ngOnInit(): void {
    this.subscription = this.lugaresServices.obtenerComentarioRandom(5).subscribe(comentarios => {
      this.comentarios = comentarios;
      this.empezarRotacion();
    });
  }

  empezarRotacion(): void {
    this.intervaloId = setInterval(() => {
      this.indiceComentarioActual = (this.indiceComentarioActual + 1) % this.comentarios.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
