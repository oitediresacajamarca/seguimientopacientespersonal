import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MorbilidadesTablaItem } from '../interfaces/morbilidades-tabla-item';

@Injectable({
  providedIn: 'root'
})
export class MorbilidadesService {
  cad:string[];

  constructor(private http:HttpClient) { }

  devolverMorbilidades(){
    return  this.http.get<any>(environment.ipmicroservicios+'CIE/');

  }

  setcadenamorb(listaa:string[]){
    this.cad=[];
    this.cad=listaa;

  }
  devuelveCadenaMorb(){
    
    return this.cad;

  }
  devolverMorbildadPaciente(cod_paciente:string){
   return this.http.get<any>(environment.ipmicroservicios+'morbilidad/paciente/'+cod_paciente);
  }
  devolverMorbildadDetalladoPaciente(cod_paciente:string){
    return this.http.get<any>(environment.ipmicroservicios+'morbilidad/paciente/descripcion/'+cod_paciente);
   }
}
