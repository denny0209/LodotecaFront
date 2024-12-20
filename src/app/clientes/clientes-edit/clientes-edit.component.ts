import { Component, OnInit , Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ClienteService } from '../clientes.service';
import { Cliente } from '../model/Cliente';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss']
})
export class ClientesEditComponent implements OnInit {

  cliente : Cliente;

  constructor(
    public dialogRef: MatDialogRef<ClientesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    if (this.data.cliente != null) {
      this.cliente = Object.assign({}, this.data.cliente);
    }
    else {
      this.cliente = new Cliente();
    }
      //this.cliente = new Cliente();
  }

  onSave() {

    // Verificar si el nombre ya existe en el servicio
  if (this.clienteService.clienteExists(this.cliente.name)) {
    alert('El cliente con este nombre ya existe.');
    return; // Detener el guardado
  }

  // Guardar el cliente si no hay duplicados
  this.clienteService.saveCliente(this.cliente).subscribe(result => {
    this.dialogRef.close();
  });
  

    // Verificamos si el nombre ya existe
  /*const clienteExistente = this.clienteService.clientes.some(
    (c) => c.name.toLowerCase() === this.cliente.name.toLowerCase()
  );

  if (clienteExistente) {
    alert('El cliente ya existe en la lista');
    return; // Detenemos el proceso de guardado
  }


  // Guardamos el cliente si no hay duplicados
  this.clienteService.saveCliente(this.cliente).subscribe((result) => {
    this.dialogRef.close();
  });

    
    /*this.clienteService.saveCliente(this.cliente).subscribe(result => {
      this.dialogRef.close();
    });    */
  }  

  onClose() {
    this.dialogRef.close();
  }

}
