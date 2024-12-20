import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module'; //añadimos de Category
import { AuthorModule } from './author/author.module';//añadimos el de author
import { GameModule } from './game/game.module';

import { ClientesModule } from './clientes/clientes.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {PrestamoModule} from './prestamo/prestamo.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Necesario para que el Datepicker funcione
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,

    
    //LoginComponent, // Agrego aquí el componente de login
  ],
  
  schemas: [],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CategoryModule, //añadimos de Category
    BrowserAnimationsModule,
    AuthorModule, //añadimos el de author
    GameModule,
    ClientesModule,//a;adimos cliente
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    PrestamoModule,
    FormsModule,

    MatDatepickerModule,
    MatNativeDateModule, // Soporte para fechas nativas
    MatSelectModule, // Para los desplegables <mat-select>
   
    
  ],
  providers: [ 
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
