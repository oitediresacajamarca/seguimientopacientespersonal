import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuatServicioService {

  constructor(private http: HttpClient) { }

  mostrarFuat(datosfuat: any) {

  console.log(datosfuat)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/pdf' })};

    this.http.post(environment.url_backend+'fuat/ver', datosfuat,{responseType:'arraybuffer'}).subscribe(
      (datos) => {

   
          var blob = new Blob([datos], {type: 'application/pdf'});
          var filename = 'test.pdf';
          FileSaver.saveAs(blob, filename);
       


      });

  }





}