import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SolicitudPacienteService {

  constructor(private http:HttpClient) { }

  buscarSolicitud(cod_solicitud:string){
  return  this.http.get<any>(environment.ipmicroservicios+'solicitaatencion/buscar/'+cod_solicitud);
  }
  
}
