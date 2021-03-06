import { DATOSPROFESIONALES } from './datos-profesionales';

export interface UsuarioBase {

    username: string,
    clave: string,
    id_persona: Number,
    id_trabajadores: number[],
    numero_doc: string,
    tipo_doc: string,
    ambitos: any,
    establecimientos: any[],
    ID_PROFESION: Number,
    ID_CONDICION: Number,
    FUNCION: string,
    TIPO_AMBITO_GEOGRAFICO: String,
    NOMBRES: string,
    APELLIDO_MAT: string,
    APELLIDO_PAT: string,
    COD_AMBITO_ADMINISTRATIVO: Number,
    COD_AMBITO_GEOGRAFICO: string,
    COD_IPRESS: string,
    CORREO: string,
    ID_DISTRITO: string, ID_GENERO: string,
    NOMBRE_IPRESS: string,
    TELEFONO: string,
    TIPO_AMBITO_ADMINISTRATIVO: string,
    logueado: string,
    DATOS_PROFESIONALES: DATOSPROFESIONALES,
    roles: string[]

}
