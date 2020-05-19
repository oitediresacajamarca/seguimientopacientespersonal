import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  verificoform= new EventEmitter<any>()

  constructor() { }
}
