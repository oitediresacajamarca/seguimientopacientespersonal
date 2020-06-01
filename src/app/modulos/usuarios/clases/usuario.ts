import { UsuarioBase } from '../interfaces/usuario-base';
import { DATOSPROFESIONALES } from '../interfaces/datos-profesionales';

export class Usuario implements UsuarioBase {
    DATOS_PROFESIONALES: DATOSPROFESIONALES = {
        COD_COLEGIATURA: '',
        ID_COLEGIO: '',
        ID_PROFESION: '',
        NOMBRE_COLEGIO: '',
        NOMBRE_ESPECIALIDAD: '',
        NOMBRE_PROFESION: ''
    }
    username: string = '';
    clave: string = '';
    id_persona: Number = 0;
    id_trabajadores: number[] = [];
    numero_doc: string = '';
    tipo_doc: string = '';
    ambitos: any[] = [];
    establecimientos: any[];
    ID_PROFESION: Number = 0;
    ID_CONDICION: Number = 0;
    FUNCION: string = '';
    TIPO_AMBITO_GEOGRAFICO: String = '';
    NOMBRES: string = '';
    APELLIDO_MAT: string = '';
    APELLIDO_PAT: string = '';
    COD_AMBITO_ADMINISTRATIVO: Number = 0;
    COD_AMBITO_GEOGRAFICO: string = '';
    COD_IPRESS: string = '';
    CORREO: string = '';
    ID_DISTRITO: string = '';
    ID_GENERO: string = '';
    NOMBRE_IPRESS: string = '';
    TELEFONO: string;
    TIPO_AMBITO_ADMINISTRATIVO: string = '';
    logueado: string = '';

}
