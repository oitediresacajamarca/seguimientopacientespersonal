import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuatServicioService {

  constructor(private http: HttpClient) { }

  mostrarFuat(datosfuat: any) {

  

    this.http.get('http://localhost:3000/fuat/ver', datosfuat).subscribe(
      (datos) => {


      });

  }





}