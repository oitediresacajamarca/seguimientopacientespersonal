import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FitrarService {

  constructor(private http: HttpClient) { }
  filtra(ambito: string, cod_distrito: string, edad_min: string, edad_max: string, genero: string, padron: string, morbilidad: string[]) {
    let re = /\,/gi;
    let filtromor=morbilidad.toString().replace(re,"','");
      let sinfiltromor=true
    if(morbilidad.length==0){
       sinfiltromor=true
    }else{
      sinfiltromor=false
    }
   
    let consulta = {
      "cod_ambito": cod_distrito,
      "edad_min": edad_min,
      "edad_max": edad_max,
      "genero": genero,
      "ID_PADRON": padron,
      "ambito": ambito,
      "morbilidades": filtromor ,
      "sinfiltromorb":sinfiltromor
    };
    return this.http.post<any>(environment.ipmicroservicios + 'busquedas/filtra/', { root: consulta });


  }
  devolverEncabezadoReporte() {
    return this.http.get<any>(environment.ipmicroservicios + 'metadatos/tabla/PERSONA_DESCRIPCION');
  }
  devolverDatosReporte() {

  }
}
