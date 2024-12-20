import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Prestamo } from '../model/Prestamo';
import { Game } from '../../game/model/Game';
import { Cliente } from '../../clientes/model/Cliente';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrestamoService } from '../prestamo.service';
import { NativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GameService } from '../../game/game.service';
import { ClienteService } from '../../clientes/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-prestamo-edit',
  standalone: true,
  providers: [
    MatSnackBar, 
    //{provide: NativeDateAdapter, useClass: NativeDateAdapter}, 
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  imports: [FormsModule, MatNativeDateModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './prestamo-edit.component.html',
  styleUrls: ['./prestamo-edit.component.scss']
})
export class PrestamoEditComponent implements OnInit {

  prestamo : Prestamo;
  games: Game[];
  clientes: Cliente[];


  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date();
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);
//trackById: any;
trackById(index: number, item: any): number {
  return item.id;
}

    constructor(
      public dialogRef: MatDialogRef<PrestamoEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { prestamo: Prestamo },
      private prestamoService: PrestamoService,
      private gameService: GameService,
      private clienteService: ClienteService,
      public dialog: MatDialog,
      private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
    
      console.log('PrestamoEditComponent - ngOnInit');
  console.log('Datos recibidos:', this.data);

      this.prestamo = this.data.prestamo ? Object.assign({}, this.data.prestamo) : new Prestamo();
  
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
  
        if (this.prestamo.game != null) {
          const gameFilter: Game[] = games.filter((game) => game.id == this.data.prestamo.game.id);
          if (gameFilter.length > 0) {
            this.prestamo.game = gameFilter[0];
          }
        }
      })
  
      this.clienteService.getClientes().subscribe((clientes) => {
        this.clientes = clientes;
  
        if (this.prestamo.cliente != null) {
          const clienteFilter: Cliente[] = clientes.filter((cliente) => cliente.id == this.data.prestamo.cliente.id);
          if (clienteFilter.length > 0) {
            this.prestamo.cliente = clienteFilter[0];
          }
        }
      })
  
    }
  
    onSave() {
  
      const showErrorMessage = (message: string) => {
        this.snackbar.open(message, 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      };
      let errorMessage = 'Ocurrió un error inesperado';
      const differenceInMilliseconds = this.prestamo.dateEnd.getTime() - this.prestamo.dateIni.getTime();
  
      if (this.prestamo.dateEnd.getTime() < this.prestamo.dateIni.getTime()) {
        showErrorMessage('La fecha de devolución no puede ser anterior a la fecha del préstamo');
        return;
      }
      else if (differenceInMilliseconds > (1000 * 3600 * 24 * 14)) {
        showErrorMessage('La fecha de devolución no puede ser superior a 14 días');
        return;
      }
    
      this.prestamoService.savePrestamo(this.prestamo).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (err) => {
          if (err.status === 409) {
            errorMessage = 'El juego ya está prestado para esas fechas o el cliente tiene dos juegos prestados';
          }
          else if (err.status === 500) {
            errorMessage = 'Hubo un error en el servidor, inténtalo de nuevo más tarde';
          }
          showErrorMessage(errorMessage);
        }
      })
    }
  
    onClose() {
      this.dialogRef.close();
    }

}
