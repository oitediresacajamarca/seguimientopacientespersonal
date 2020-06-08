import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  personal: any
  constructor(private http: HttpClient) {


  }
   devolver_personal( nro_documento:string,ipress:string){
  
   return   this.http.get<any>(environment.url_backend + 'personal/'+nro_documento+'/'+ipress);
    }

  
}
