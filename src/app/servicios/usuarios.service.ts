import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  login(usu: string, clave: string,peso:number) {
    let consulta = {
      "username": usu,
      "clave": clave,
      "peso":peso

    }
    return this.http.post<any>(environment.url_backend+'usuarios/login', { root: consulta });
  }
  loginant(usu:string,clave:string){
    let consulta={
    "usuario":usu,
    "clave":clave

    }
  return  this.http.post<any>(environment.ipmicroservicios+'usuarios/login/',{root:consulta});
  }

  verificar(username: string) {
    return this.http.post<any>(environment.url_backend+'usuarios/verifica', { username: username });
  }
  nuevo(nuevo: any) {
    console.log(nuevo);
    return this.http.post<any>(environment.url_backend+'usuarios/nuevo', nuevo);
  }
  generaFakeNom(){
  return  this.http.get(environment.url_backend+'usuarios/generarFake')

  }

}
