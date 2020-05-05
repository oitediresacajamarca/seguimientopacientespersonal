import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/selectitem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeografiaService {
  provincias:SelectItem[];

  constructor(private http:HttpClient) {
    this.provincias=[
      {label:"CAJAMARCA",value:"0601"},
      {label:"CAJABAMBA",value:"0602"},
      {label:"CELENDIN",value:"0603"},
      {label:"CHOTA",value:"0604"},
      {label:"CONTUMAZA",value:"0605"},
      {label:"CUTERVO",value:"0606"},
      {label:"HUALGAYOC",value:"0607"},
      {label:"JAEN",value:"0608"},
      {label:"SAN IGNACIO",value:"0609"},
      {label:"SAN MARCOS",value:"0610"},
      {label:"SAN MIGUEL",value:"0611"},
      {label:"SAN PABLO",value:"0612"},
      {label:"SANTA CRUZ",value:"0613"},
  
  
    ]


   }

   devolverProvincias(){

    return this.provincias;
   }
   devolverProvincia(cod_prov:string){

      return this.provincias.find(prov=>prov.value==cod_prov)
   }
   devolverDistrito(cod_dis:string){
    return this.http.get<any>('http://'+environment.ip+'/distritos/'+cod_dis)
   }
   devolverDistritos(codprovincia:string){
     return this.http.get<any>('http://'+environment.ip+'/distritos/provincia/'+codprovincia)
   }
}
