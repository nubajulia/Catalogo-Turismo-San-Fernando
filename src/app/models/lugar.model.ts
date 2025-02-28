export interface Lugar {
  id: string;
  nombre: string;
  descripcion: string;
  localizacion?: string;
  imagenUrl: string;
  parrafo1: string;
  parrafo2: string;
  valoracion: number[];
  comentarios: string[];
  comentarioUsuario: string[];
}
