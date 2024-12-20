import { Cliente } from "../../clientes/model/Cliente";
import { Game } from "../../game/model/Game";

export class Prestamo {
    id: number;
    game: Game;
    cliente: Cliente;
    dateIni: Date;
    dateEnd: Date;
}