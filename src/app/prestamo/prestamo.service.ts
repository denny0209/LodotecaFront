import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Prestamo } from './model/Prestamo';
import { PrestamoPage } from './model/PrestamoPage';
import { PRESTAMO_DATA } from './model/mock-prestamo';
import { PrestamoSearchDto } from './model/PrestamoSearchDto';


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(
    //para que front conecte directamente con las operaciones del back
    private http: HttpClient
  ) { }

  //getPrestamo(pageable: Pageable): Observable<PrestamoPage> {
    getPrestamo(prestamoSearchDto: PrestamoSearchDto): Observable<PrestamoPage> {
    //return of(PRESTAMO_DATA);
    //para que front conecte directamente con las operaciones del back
    //return this.http.post<PrestamoPage>('http://localhost:8080/prestamo', {pageable:pageable});
    return this.http.post<PrestamoPage>('http://localhost:8080/prestamo', prestamoSearchDto);
}

savePrestamo(prestamo: Prestamo): Observable<void> {
    //return of(null);

    //para que front conecte directamente con las operaciones del back
    let url = 'http://localhost:8080/prestamo';
        if (prestamo.id != null) url += '/'+prestamo.id;

        return this.http.put<void>(url, prestamo);
}

deletePrestamo(idPrestamo : number): Observable<void> {
  //return of(null);
  //para que front conecte directamente con las operaciones del back
    return this.http.delete<void>('http://localhost:8080/prestamo/'+idPrestamo);
}  

getAllPrestamos(): Observable<Prestamo[]> {
  //return of(PRESTAMO_DATA_LIST);
  return this.http.get<Prestamo[]>('http://localhost:8080/prestamo');
}
}
