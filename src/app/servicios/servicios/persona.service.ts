import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) {


   }
   devolverPersona(tipodoc:string,dni:string,fec_nac:string){
    return this.http.get<any>('http://'+environment.ip+'/persona/paciente/tipodoc/'+tipodoc+'/numerodoc/'+dni+'/fecha_nacimiento/'+fec_nac)
   }
   guardarPersona(person:any){
     
    return this.http.post('http://'+environment.ip+'/persona/pacientenuevo/',person);
   }
   devolverPersonaPaciente( tipodoc:String,num_doc:String){

    return this.http.get<any>('http://'+environment.ip+'/persona/paciente/tipodoc/'+tipodoc+'/numerodoc/'+num_doc)
  
   }
   devolverPersonaTrabajador(num_doc){
    return this.http.get<any>('http://'+environment.ip+'/persona/trabajador/'+num_doc)

   }

}
