import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  cod_con:string;
  verificoform= new EventEmitter<any>()
  actualizarNotificacione= new EventEmitter<any>()
  actualizarUsuarios=new EventEmitter<any>();
  actualizarPerfil
  cambiopaciente= new EventEmitter<any>()


  constructor() { }
}
