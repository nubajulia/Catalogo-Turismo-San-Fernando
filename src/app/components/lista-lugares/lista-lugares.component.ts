import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Lugar } from '../../models/lugar.model';
import { LugarService } from '../../services/lugar.service';
import { RankingLugaresComponent } from '../ranking-lugares/ranking-lugares.component';

@Component({
  selector: 'app-lista-lugares',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatButtonModule, RouterModule, ComentariosComponent,NavbarComponent, RankingLugaresComponent],
  templateUrl: './lista-lugares.component.html',
  styleUrls: ['./lista-lugares.component.css']
})

export class ListaLugaresComponent implements OnInit {
  lugares: Lugar[] = [];

  constructor(private lugaresService: LugarService) {}
  ngOnInit(): void {
    this.lugaresService.obtenerLugares().subscribe((data) => {
      this.lugares = data;
    });
  }
}
