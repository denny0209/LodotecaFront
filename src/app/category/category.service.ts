import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { HttpClient } from '@angular/common/http';
//import { CATEGORY_DATA } from './model/mock-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    //para que me devuelva datos
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    //return of(CATEGORY_DATA);
    //return new Observable();
    return this.http.get<Category[]>('http://localhost:8080/category');
  }

  saveCategory(category: Category): Observable<Category> {
    //return of(null);
    //para la llamada de guardado invocamos la operación de negocio "put"
    let url = 'http://localhost:8080/category';
        if (category.id != null) url += '/'+category.id;

        return this.http.put<Category>(url, category);
  }

  deleteCategory(idCategory : number): Observable<any> {
   // return of(null);
   //para la llamada de borrado cambiamos e invocamos la operación de negocio "delete"
   return this.http.delete('http://localhost:8080/category/'+idCategory);
  }  

}
