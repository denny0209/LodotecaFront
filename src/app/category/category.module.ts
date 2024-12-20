import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//como hemos añadido un componente nuevo al HttpClient (category.service.ts)
//tenemos que añadir la dependencia al módulo padre:
import { HttpClientModule } from '@angular/common/http';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

//para poder abrir dentro un dialogo necesitamos obtener en el constructor
//un MatDialog. De ahi que hayamos tenido que añadirlo como import y en el constructor

//como hemos usado un MatDialog en el componente, necesitamos añadirlo también al módulo,
//asi que abrimos el fichero "category.module.ts" y añadimos:

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,

    MatDialogModule,

    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatIconModule, 
    MatButtonModule,
    HttpClientModule,
  ],

  //añadimos esto tbm:
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ]


})
export class CategoryModule { }
