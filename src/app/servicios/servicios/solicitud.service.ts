import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http:HttpClient) { }
  guardarSolicitud(solicitud:any){
    return this.http.post('http://'+environment.ip+'/solicitaatencion/',solicitud);
  }
  cerrarSolicitud(solicitud:any){
    return this.http.get('http://'+environment.ip_backend+'/solicitud/cerrar/',solicitud);
  }
  editarSolicitud(cod_solicitud:string,editado:any){
    return this.http.post('http://'+environment.ip_backend+'/solicitudes/actualisar/'+cod_solicitud,editado)

  }

}
