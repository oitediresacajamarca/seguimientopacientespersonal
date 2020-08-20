import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovidRefService {

  constructor(private http:HttpClient) {

   }
   devolverGeoReferencias(){
     return this.http.get<any[]>(environment.url_backend+'heatmap')
   }
   devolverGeoReferenciasFallecidos(){
    return this.http.get<any[]>(environment.url_backend+'base-noti/fallecidos/region')
  }
   devolverGeoReferenciasDist(cod_distrito){
    return this.http.get<any[]>(environment.url_backend+'base-noti/confirmadosgeo/'+cod_distrito)
  }
}
