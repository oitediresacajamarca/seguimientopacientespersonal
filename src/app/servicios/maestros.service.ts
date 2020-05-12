import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(private http:HttpClient) {


   }
   devolverPadrones(){
   
    return this.http.get<any>(environment.ipmicroservicios+'padrones/listarpadrones')
   
     
   }

}
