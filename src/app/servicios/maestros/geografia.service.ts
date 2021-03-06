import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeografiaService {

  constructor(private http:HttpClient) { }
  devolverDistrito(cod_distrito:string){
   return  this.http.get(environment.url_backend+'distribucion-geografica/distrito/'+cod_distrito);
  }
}
