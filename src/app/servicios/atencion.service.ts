import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AtencionDetalle } from '../interfaces/atencion-detalle';
import { Diagnostico } from '../interfaces/diagnostico';
import { AtencionDiagnosticoItem } from '../interfaces/atencion-diagnostico-item';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  constructor(private http: HttpClient) {


  }
  registrar(aten: any) {

    return this.http.post<any>(environment.url_backend + 'atenciones/registrar/', aten);
  }
  registrarExamenfis(examen: any, id_atencion: string, id_trabajador: string) {

    return this.http.post(environment.ipmicroservicios + 'atenciones/examenes/', { root: { "examenes": examen, "id_atencion": id_atencion, "id_trabajador": id_trabajador } });
  }
  registrarAtencionDetalle(detallea: AtencionDetalle, id_atencion: string, id_trabajador: string) {
    return this.http.post(environment.ipmicroservicios + 'atenciones/detalle/', { root: { "detalle": detallea, "id_atencion": id_atencion, "id_trabajador": id_trabajador } });

  }
  registrarAtencionDiagnosticos(diagnosticos: AtencionDiagnosticoItem[], id_atencion: string, id_trabajador: string) {
    diagnosticos.forEach(element => {
      element.ID_ATENCION = id_atencion;
      element.ID_TRABAJADOR = id_trabajador;
    });
    return this.http.post(environment.url_backend + 'atencion-diagnostico/guardardiagnosticos', diagnosticos);

  }
  devolverAtencionesRealizadas(id_persona_personal) {
    return this.http.get<any>(environment.url_backend + 'atenciones/atencionesrealizadas/' + id_persona_personal);
  }
  devolverAtencionesRealizadasPersona(id_persona) {
    return this.http.get<any>(environment.url_backend + 'atenciones/atencionesrealizadaspersona/' + id_persona);
  }

  devolverAtencionesRealizadasPorfecha(DESDE:string,HASTA:string){
    console.log(DESDE);
    console.log(HASTA);
    return this.http.post<any>(environment.url_backend + 'atenciones/atencionesRealizadasFiltros/',{DESDE:DESDE,HASTA:HASTA});
  }


}
