import { AmbitoInterface } from '../modulos/usuarios/interfaces/ambito-interface';

export class Ambito implements AmbitoInterface{
    peso_sup: number;
    tipo_ambito: string="";
    cod_ambito: string="";
    COD_IPRESS: number;
    COD_MICRORED: number;
    COD_RED: number;
    COD_SUBREGION: number;
    peso: number=999999999999999;
    nivel: import("../modulos/usuarios/enums/nivel.enum").Nivel;
    NOMBRE_IPRESS: string="";
    NOMBRE_MICRORED: string="";
    NOMBRE_RED: string="";
    NOMBRE_SUBREGION: string="";
    
}
