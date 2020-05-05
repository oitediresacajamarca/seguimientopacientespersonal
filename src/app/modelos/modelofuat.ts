import { FormatoFuat } from '../interfaces/formato-fuat';

export class Modelofuat implements FormatoFuat{
    numeroFuat: number;
    nombresypaciente: string;
    fechasolicitud: string;
    horasolicitud: string;
    edad: string;
    sexo: string;
    nro_documento: string;
    tiposeguro: string;
    nuevocontrol: boolean;
    numerocontrol: string;
    especialidades: string[];
    examenfisico: { presionarterial: string; frecuenciacardiaca: string; frecuenciarespi: string; temperatura: string; satO2: string; peso: string; talla: string; descripciondecaso: string; };
    tratamiento: string;
    examendeapoyo: string;
    motivo: string[];
    nombreipress: string;
    codipress: string;
    fechaatencion: string;
    horaatencion: string;
    diagnosticos: import("../interfaces/diagnostico").Diagnostico[];
    recomendaciones: string[];
    personal: import("../interfaces/personal").Personal;
}
