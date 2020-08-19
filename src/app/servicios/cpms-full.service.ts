import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CpmsFullService {

  constructor(private http:HttpClient) { }
  devolverCpms(cod_busqueda:string){
   return this.http.get(environment.url_backend+'cpms-full/coincidencias/'+cod_busqueda)
  }
}
