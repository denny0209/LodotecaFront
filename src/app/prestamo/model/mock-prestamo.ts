//import { PrestamoPage } from "./PrestamoPage";

import { Prestamo } from "./Prestamo"

export const PRESTAMO_DATA: Prestamo[] = //{
    //content: 
    [
        { id: 1, game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, cliente: { id: 1, name: 'Cliente 1'}, dateIni: new Date("2021-08-02"), dateEnd: new Date("2021-08-05"), },
        { id: 2, game: { id: 2, title: 'Juego 2', age: 8, category: { id: 1, name: 'Categoría 1' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, cliente: { id: 2, name: 'Cliente 2'}, dateIni: new Date("2021-08-12"), dateEnd: new Date("2021-08-16"), },
        { id: 3, game: { id: 3, title: 'Juego 3', age: 4, category: { id: 1, name: 'Categoría 1' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } }, cliente: { id: 2, name: 'Cliente 3'}, dateIni: new Date("2021-08-20"), dateEnd: new Date("2021-08-25"), },
        { id: 4, game: { id: 4, title: 'Juego 4', age: 10, category: { id: 2, name: 'Categoría 2' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 2' } }, cliente: { id: 4, name: 'Cliente 4'}, dateIni: new Date("2021-09-02"), dateEnd: new Date("2021-09-05"),},
        { id: 5, game: { id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, cliente: { id: 5, name: 'Cliente 5'}, dateIni: new Date("2021-09-22"), dateEnd: new Date("2021-09-25"), },
        //{ id: 6, game: 'seis', clientes:'J. Alex Kavern', date_ini: new Date(2021, 11, 12), date_end: new Date(2021, 11, 27), },
        //{ id: 7, game: 'siete', clientes:'Corey Young', date_ini: new Date(2021, 12, 1), date_end: new Date(2021, 12, 16), },
    ]
    /*,  
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 7*/
//}