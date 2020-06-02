import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeografiaService } from './servicios/geografia.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistribucionAdministrativaService {
  subregiones:any[];
  redes:any[];
 

  constructor(private http:HttpClient,private geo:GeografiaService) {
    this.subregiones = [

      { label: "CAJAMARCA", value: 1 },
      { label: "CHOTA", value: 2 },
      { label: "CUTERVO", value: 3 },
      { label: "JAEN", value: 4 }
    ];

    this.redes = [
      { label: "CONTUMAAZA", value: 1, subregion: 1 },
      { label: "CAJAMARCA", value: 2, subregion: 1 },
      { label: "CELENDIN", value: 3, subregion: 1 },
      { label: "SAN MARCOS", value: 4, subregion: 1 },
      { label: "CAJABAMBA", value: 5, subregion: 1 },
      { label: "SAN MIGUEL", value: 6, subregion: 1 },
      { label: "SAN PABLO", value: 7, subregion: 1 },
      { label: "CHOTA", value: 8, subregion: 2 },
      { label: "BAMBAMARCA", value: 9, subregion: 2 },
      { label: "SANTA CRUZ", value: 10, subregion: 2 },
      { label: "CUTERVO", value: 11, subregion: 3 },
      { label: "SOCOTA", value: 12, subregion: 3 },
      { label: "JAEN", value: 13, subregion: 4 },
      { label: "SAN IGNACION", value: 14, subregion: 4 },
    ];
   }

   devolver_redes_por_subregion(id_region:number){
   return this.redes.filter(dat=>dat.subregion==id_region)
   }
   devolver_microred_por_red(id_red:string):Observable<any>{

  return  this.geo.devolverMicroredPorRed(id_red);

   }   
   devolver_subregiones(){
     return this.subregiones;
   }
   devolver_redes(){

    return this.redes;
   }
   devolver_Ipress(cod_ipress:string){
     console.log(cod_ipress)
    return this.http.get<any>(environment.url_backend+'distribucion-administrativa/ipress/'+cod_ipress);

   }
}
