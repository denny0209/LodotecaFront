import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { LoginComponent } from './core/login/login.component';

import { DashboardComponent } from './core/dashboard/dashboard.component';  // Asegúrate de tener este componente
import { AuthGuard } from './core/services/auth.guard';  // Guard para proteger las rutas
import { PrestamoListComponent } from './prestamo/prestamo-list/prestamo-list.component';

//añadimos la ruta del componente dentro del componenterouting de Angular
//para poder acceder a él
const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full'},
  { path: 'categories', component: CategoryListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'games', component: GameListComponent },
  { path: 'clientes', component: ClientesListComponent },
  { path: 'login', component: LoginComponent },

  { path: 'prestamo', component: PrestamoListComponent },

  // Ruta para el dashboard (solo accesible si el usuario está logueado)
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],  // Protege esta ruta con el AuthGuard
  },
  // Asegúrate de agregar rutas protegidas para los listados si el usuario tiene el rol adecuado
  {
    path: 'dashboard/categories',
    component: CategoryListComponent,
    canActivate: [AuthGuard],  // Solo si está logueado
  },
  {
    path: 'dashboard/authors',
    component: AuthorListComponent,
    canActivate: [AuthGuard],  // Solo si está logueado
  },
  {
    path: 'dashboard/clientes',
    component: ClientesListComponent,
    canActivate: [AuthGuard],  // Solo si está logueado
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
