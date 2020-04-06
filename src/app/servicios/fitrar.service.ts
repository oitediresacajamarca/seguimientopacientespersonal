import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FitrarService {

  constructor(private http:HttpClient) { }
  filtra(cod_distrito:string,edad_min:string,edad_max:string,genero:string){

    let consulta=	{
      "cod_distrito":cod_distrito,
      "edad_min":edad_min,
      "edad_max":edad_max,
      "genero":genero
      };
   return this.http.post<any>(environment.ipmicroservicios+'solicitaatencion/filtrar/',{root:consulta});


  }
  devolverEncabezadoReporte(){
   return this.http.get<any>(environment.ipmicroservicios+'metadatos/tabla/SOLICITUDES_SEGUIMIENTO');
  }
  devolverDatosReporte(){
    
  }
}
