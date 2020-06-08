import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MorbilidadesTablaItem } from '../interfaces/morbilidades-tabla-item';

@Injectable({
  providedIn: 'root'
})
export class MorbilidadesService {
  cad: string[];
  eventocargo= new EventEmitter<any>()
  lista:any=null


  constructor(private http: HttpClient) { }

  devolverMorbilidades() {
    
    if (this.lista == null) {
      this.http.get<any>(environment.ipmicroservicios + 'CIE/').subscribe((dat) => { this.eventocargo.emit( dat.respuesta) 
      this.lista=dat.respuesta;
      });
    }
 

  }


  devolverMorbilidad(codigo: string) {
    return this.http.get<any>(environment.ipmicroservicios + 'CIE/' + codigo)
  }

  setcadenamorb(listaa: string[]) {
    this.cad = [];
    this.cad = listaa;

  }
  devuelveCadenaMorb() {

    return this.cad;

  }
  devolverMorbildadPaciente(cod_paciente: string) {
    return this.http.get<any>(environment.url_backend+ 'morbilidades/' + cod_paciente);
  }
  devolverMorbildadDetalladoPaciente(cod_paciente: string) {
    return this.http.get<any>(environment.ipmicroservicios + 'morbilidad/paciente/descripcion/' + cod_paciente);
  }
}
