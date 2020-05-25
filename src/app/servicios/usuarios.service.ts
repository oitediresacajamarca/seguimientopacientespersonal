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
    return this.http.post<any>('http://localhost:3000/usuarios/login', { root: consulta });
  }
  verificar(username: string) {
    return this.http.post<any>('http://localhost:3000/usuarios/verifica', { username: username });
  }
  nuevo(nuevo: any) {
    console.log(nuevo);
    return this.http.post<any>('http://localhost:3000/usuarios/nuevo', nuevo);
  }

}
