import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { ListaLugaresComponent } from './components/lista-lugares/lista-lugares.component';
import { IniciarSesionComponent } from './components/iniciarsesion/iniciarsesion.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
  { path: '', component: ListaLugaresComponent },
  { path: 'detalle/:id', loadComponent: () => import('./components/detalles/detalles.component').then(m => m.DetallesComponent) },
  {path: 'admin',loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),canActivate: [AdminGuard]},
  { path: 'anadir-lugar', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AdminGuard] },
  { path: 'iniciosesion', component: IniciarSesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'iniciosesion' }
];
