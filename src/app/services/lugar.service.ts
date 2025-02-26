import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Lugar } from '../models/lugar.model';

@Injectable({ providedIn: 'root' })
export class LugarService {
  private apiURL = 'http://localhost:3000/lugares';

  constructor(private http: HttpClient) { }

  obtenerLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiURL);
  }

  obtenerLugarById(id: string): Observable<Lugar> {
    return this.http.get<Lugar>(`${this.apiURL}/${id}`);
  }

  anadirNuevoLugar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.apiURL, lugar);
  }

  anadirComentarioLugar(lugarId: string, comentario: string, valoracion: number, usuario: string): Observable<Lugar> {
    return this.obtenerLugarById(lugarId).pipe(
      map((lugar: Lugar) => ({
        ...lugar,
        comentarios: [...lugar.comentarios, comentario],
        valoracion: [...lugar.valoracion, valoracion],
        comentarioUsuario: [...lugar.comentarioUsuario,usuario]
      })),
      switchMap((actualizarLugar: Lugar) => this.http.put<Lugar>(`${this.apiURL}/${lugarId}`, actualizarLugar))
    );
  }

  obtenerComentarioRandom(contador: number = 5): Observable<{ comentario: string; usuario: string }[]> {
    return this.obtenerLugares().pipe(
      map(lugares => {
        let todosComentarios: { comentario: string; usuario: string }[] = [];

        lugares.forEach(lugar => {
          if (lugar.comentarios && lugar.comentarioUsuario) {
            lugar.comentarios.forEach((comentario, index) => {
              todosComentarios.push({ comentario, usuario: lugar.comentarioUsuario[index] || 'Anónimo' });
            });
          }
        });

        return todosComentarios.sort(() => 0.5 - Math.random()).slice(0, contador);
      })
    );
  }

  private usuariosUrl = 'http://localhost:3000/usuarios'

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl);
  }
}
