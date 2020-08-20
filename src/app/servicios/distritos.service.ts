import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistritosService {


  constructor(private http:HttpClient) { 

  }
  devolverDistritos(codprov:String){
    return this.http.get<any>(environment.ipmicroservicios+'distritos/provincia/'+codprov);
  }
  devolverCP(coddist:string){
    return this.http.get<any>(environment.ipmicroservicios+'centrospoblados/distrito/'+coddist);
  }
  devolverGeoreferncia(coddist:string){
    return this.http.get<any>(environment.url_backend+'ubigeos-distritos/'+coddist);
  }
  
}
