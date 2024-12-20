import { Pageable } from "../../core/model/page/Pageable";

export class PrestamoSearchDto {
    pageable: Pageable;
    idGame: number | null;
    idCustomer: number | null;
    date: string | null;
}