import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
 
 
  login(usu:string,clave:string){
    let consulta={
    "username":usu,
    "clave":clave

    }
  return  this.http.post<any>('http://localhost:3000/usuarios/',{root:consulta});
  }
}
