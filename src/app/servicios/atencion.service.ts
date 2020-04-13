import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  constructor(private http:HttpClient) {


   }
   registrar(id_trabajador:string,fecha_aten:string,id_paciente:string,id_solicitud:string,es_covid:string,tipo_covid:string){

        let aten={
        "ID_TRABAJADOR":id_trabajador,
        "FECHA_ATENCION":fecha_aten
        ,"ID_PACIENTE":id_paciente,
        "ID_SOLICITUD":id_solicitud,
        "ES_COVID":es_covid,
        "TIPO_COVID":tipo_covid};
      
      return this.http.post(environment.ipmicroservicios+'atenciones/registrar/',{root:aten});
   }
}
