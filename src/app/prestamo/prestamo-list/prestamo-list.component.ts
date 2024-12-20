import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule  } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { Game } from 'src/app/game/model/Game';
import { Cliente } from 'src/app/clientes/model/Cliente';
import { PrestamoSearchDto} from '../model/PrestamoSearchDto';
import { ClienteService } from 'src/app/clientes/clientes.service';
import { GameService } from 'src/app/game/game.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-prestamo-list',
  standalone: true,

  providers: [DatePipe],
  imports: [MatTableModule, MatNativeDateModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatPaginatorModule],
  templateUrl: './prestamo-list.component.html',
  styleUrls: ['./prestamo-list.component.scss']
})
export class PrestamoListComponent implements OnInit {


  pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Prestamo>();
    displayedColumns: string[] = ['id', 'game', 'cliente', 'date_ini','date_end', 'action'];

    games: Game[];
    clientes: Cliente[];
    prestamos: Prestamo[];
    filterGame: Game;
    filterCliente: Cliente;
    filterDate: Date;
    prestamoSearchDto: PrestamoSearchDto;
    

    private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);
console: any;


    constructor(
      private clienteService: ClienteService,
        private gameService: GameService,
        private prestamoService: PrestamoService,
        public dialog: MatDialog,
        private datePipe: DatePipe,
    ) { }

    trackByGameId(index: number, game: Game): number {
      return game.id; // O cualquier propiedad única del objeto Game
  }
  
  trackByClienteId(index: number, cliente: Cliente): number {
      return cliente.id; // O cualquier propiedad única del objeto Cliente
  }

    ngOnInit(): void {
      this.gameService.getGames().subscribe((games) => this.games = games);
    this.clienteService.getClientes().subscribe((clientes) => this.clientes = clientes);
        this.loadPage();
    }

    loadPage(event?: PageEvent) {

        let pageable : Pageable =  {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }

        if (event != null) {
            pageable.pageSize = event.pageSize
            pageable.pageNumber = event.pageIndex;
        }


        console.log('ID del cliente seleccionado:', this.filterCliente ? this.filterCliente.id : null);
        this.prestamoSearchDto = {
          pageable: pageable,
          idGame: this.filterGame != null ? this.filterGame.id : null,
          idCustomer: this.filterCliente != null ? this.filterCliente.id : null,
          date: this.parseDate(this.filterDate),
          
        }

        this.prestamoService.getPrestamo(this.prestamoSearchDto).subscribe(data => {
          console.log('Contenido recibido:',data.content); 
            this.dataSource.data = data.content.map(prestamo => ({
              ...prestamo,
              date_ini: prestamo.dateIni ? new Date(prestamo.dateIni) : null,
              date_end: prestamo.dateEnd ? new Date(prestamo.dateEnd) : null
          }));
            console.log('Datos en dataSource después de asignar:', this.dataSource.data); // Ya deberían estar los datos
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });

        console.log('Contenido prueba:', this.dataSource.data);

    }  
    
    private parseDate(date: any): string | null {
      if (!date) {
          return null; // Si no hay fecha, regresa null
      }
      const parsedDate = date instanceof Date ? date : new Date(date); // Si no es Date, intenta convertirlo
      return isNaN(parsedDate.getTime()) ? null : this.datePipe.transform(parsedDate, 'dd-MM-yyyy'); // Si la fecha no es válida, regresa null
  }

  createPrestamo() {  
    console.log('Intentando abrir el componente de nuevo préstamo');    
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('El diálogo se ha cerrado');
            this.ngOnInit();
        });      
    }  
    

    editPrestamo(prestamo: Prestamo) {    
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: { prestamo: prestamo }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });    
    }

    onCleanFilter(): void {
      this.filterGame = null;
      this.filterCliente = null;
      this.filterDate = null
      this.onSearch();
    }
  
    onSearch(): void {
      console.log('Filtro por cliente:', this.filterCliente); 
      this.loadPage();
    }

    deletePrestamo(prestamo: Prestamo) {    
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: { title: "Eliminar prestamo", description: "Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el prestamo?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.prestamoService.deletePrestamo(prestamo.id).subscribe(result =>  {
                    this.ngOnInit();
                }); 
            }
        });
    } 

}


