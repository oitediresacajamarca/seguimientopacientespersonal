import { DIAGNOSTICOS } from './diagnosticos';
import { PROFESIONAL } from './profesional';
import { ITEMSTRATAMIENTO } from './items-tratamiento';

export interface Receta {  
          NOMBRE_IPRESS: string,
          DIRECCION: string,
          CIUDAD:string,
          NOMBRE_COMPLETO_PACIENTE: string,
          EDAD_PACIENTE: string,
          COD_ASEGURADO: string,
          NRO_DOCUMENTO: string,
          FINANCIADOR: string,
          ATENCION: string,
          ESPECIALIDAD: string,
          NR0_HCL: string,
          DIAGNOSTICOSlist:DIAGNOSTICOS[],
          PROFESIONAL:PROFESIONAL,
          ITEMS:ITEMSTRATAMIENTO[],
      
      
      
     
}
