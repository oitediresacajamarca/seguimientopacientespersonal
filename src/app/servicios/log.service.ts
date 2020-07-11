import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
 

  constructor(private http:HttpClient,private current:CurrentUserService) { }

  log(accion:string,descripcion:any){
    let user= this.current.getCurrentUser()

 return   this.http.post(environment.url_backend+'logs/log',{
      user:user.username,
      accion:accion,
      payload:descripcion
    })
  }


}
