import { Nivel } from '../enums/nivel.enum';

export interface AmbitoInterface {
    tipo_ambito: string,
    cod_ambito: string,
    COD_IPRESS: number,
    COD_MICRORED: number,
    COD_RED: number,
    COD_SUBREGION: number,
    peso:number,
    nivel:Nivel,
    NOMBRE_IPRESS:string,
    NOMBRE_MICRORED:string,
    NOMBRE_RED:string,
    NOMBRE_SUBREGION:string,
    peso_sup:number

   

}
