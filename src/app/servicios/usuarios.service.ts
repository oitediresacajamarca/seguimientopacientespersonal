import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstadosService } from './estados.service';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  sessionUsuario

  constructor(private http: HttpClient,private estados:EstadosService) { }

  login(usu: string, clave: string, peso: number) {
    let consulta = {
      "username": usu,
      "clave": clave,
      "peso": peso

    }
    return this.http.post<any>(environment.url_backend + 'usuarios/login', { root: consulta });
  }
  loginant(usu: string, clave: string) {
    let consulta = {
      "usuario": usu,
      "clave": clave

    }
    return this.http.post<any>(environment.ipmicroservicios + 'usuarios/login/', { root: consulta });
  }

  verificar(username: string) {
    return this.http.post<any>(environment.url_backend + 'usuarios/verifica', { username: username });
  }
  nuevo(nuevo: any) {
    console.log(nuevo);
    return this.http.post<any>(environment.url_backend + 'usuarios/nuevo', nuevo);
  }
  generaFakeNom() {
    return this.http.get(environment.url_backend + 'usuarios/generarFake')

  }
  devolverUsuarios() {
    return this.http.get(environment.url_backend + 'usuarios/listar')
  }
  eliminarUsuario(id: string) {
    return this.http.get(environment.url_backend + 'usuarios/eliminar/' + id)
  }
  actualizarUsuarioPass(id: string, body: any) {
    return this.http.put<any>(environment.url_backend + 'usuarios/actualizarP/' + id, body)
  }
  devolverUsuariosAmbitos(){
    let session =this.getSession();
    return this.http.post<any>(environment.url_backend + 'usuarios/listarporambito', {peso:session.ambitos[0].peso,peso_sup:session.ambitos[0].peso_sup})

  }
  validarAmbitoPermitido(){

  }
  getSession(){
    if(this.sessionUsuario== null || this.sessionUsuario == undefined){

      this.sessionUsuario=JSON.parse(localStorage.getItem('datos'))
    }
    return this.sessionUsuario
  }
}
