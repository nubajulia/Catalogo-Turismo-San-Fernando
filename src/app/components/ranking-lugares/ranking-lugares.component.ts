import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Lugar } from '../../models/lugar.model';
import { LugarService } from '../../services/lugar.service';

@Component({
  selector: 'app-ranking-lugares',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './ranking-lugares.component.html',
  styleUrls: ['./ranking-lugares.component.css']
})
export class RankingLugaresComponent implements OnInit {
  lugaresMejorValorados: Lugar[] = [];

  constructor(private lugaresService: LugarService) { }

  ngOnInit(): void {
    this.lugaresService.obtenerLugares().subscribe(lugares => {
      this.lugaresMejorValorados = this.obtenerLugaresMejorValorados(lugares);
    });
  }

  obtenerLugaresMejorValorados(lugares: Lugar[]): Lugar[] {
    return lugares
      .filter(lugar => lugar.valoracion.length > 0)
      .sort((a, b) => {
        const valoracionA = a.valoracion.reduce((sum, r) => sum + r, 0) / a.valoracion.length;
        const valoracionB = b.valoracion.reduce((sum, r) => sum + r, 0) / b.valoracion.length;
        return valoracionB - valoracionA;
      })
      .slice(0, 5);
  }
  obtenerMediaValoraciones(valoraciones: any[]): number {
    const valoracionesNumericas = valoraciones
      .map(v => Number(v))
      .filter(v => !isNaN(v) && v >= 1 && v <= 5);

    return valoracionesNumericas.length > 0
      ? valoracionesNumericas.reduce((a, b) => a + b, 0) / valoracionesNumericas.length
      : 0;
  }
}
