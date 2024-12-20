import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Cliente } from './model/Cliente';
import { CLIENTE_DATA } from './model/mock-clientes';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = []; // Lista temporal para validar duplicados

  constructor(
    //para que me devuelva datos
    private http: HttpClient
  ) { }

  getClientes(): Observable<Cliente[]> {
    
    //return of (CLIENTE_DATA)

    //llamada del listado>
    return this.http.get<Cliente[]>('http://localhost:8080/cliente');
    //llamada del listado
  }


  // Método para cargar los clientes en memoria local
  loadClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/cliente').pipe(
      tap(clientes => this.clientes = clientes)
    );
  }
  

  saveCliente(cliente: Cliente): Observable<Cliente> {
    //return of(null);

    //para la llamada de GUARDADO/EDICION invocamos la operación de negocio "put"
    let url = 'http://localhost:8080/cliente';
        if (cliente.id != null) url += '/'+cliente.id;

        //return this.http.put<Cliente>(url, cliente);

        // Actualiza la lista local después de guardar
    return this.http.put<Cliente>(url, cliente).pipe(
      tap(() => this.clientes.push(cliente))
    );

  }

  deleteCliente(idCliente : number): Observable<any> {
   //return of(null);

   //para la LLAMADA DE BORRADO cambiamos e invocamos la operación de negocio "delete"
   return this.http.delete('http://localhost:8080/cliente/'+idCliente);
  } 
  
  // Método para validar si un cliente ya existe
  clienteExists(name: string): boolean {
    return this.clientes.some(cliente => cliente.name.toLowerCase() === name.toLowerCase());
  }

}
