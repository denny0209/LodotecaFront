import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../model/Cliente';
import { MatDialog } from '@angular/material/dialog';
import { ClientesEditComponent } from '../clientes-edit/clientes-edit.component';
import { ClienteService } from '../clientes.service';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // Llama al método loadClientes para cargar los datos en el servicio y también llenar la tabla
  this.clienteService.loadClientes().subscribe(clientes => {
    this.dataSource.data = clientes; // Actualiza la tabla con los datos cargados
  });
    
    /*this.clienteService.getClientes().subscribe(
      clientes => this.dataSource.data = clientes
    );*/
  }

  createCliente() {    
    const dialogRef = this.dialog.open(ClientesEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  } 
  
  //UTILIZAMOS EL DIALOGO PARA EDITAR -> 
  
  editCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClientesEditComponent, {
      data: { cliente: cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  //a;adimos el borrado despu'es de a;adir el componente gen'erico de dialog creado en el CORE
  deleteCliente(cliente: Cliente) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.deleteCliente(cliente.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  

}
