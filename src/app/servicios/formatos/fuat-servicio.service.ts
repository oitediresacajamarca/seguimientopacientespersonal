import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';
import { FormatoFuat } from 'src/app/interfaces/formato-fuat';

@Injectable({
  providedIn: 'root'
})
export class FuatServicioService {

  formatofuat: FormatoFuat
  url: string;

  constructor(private http: HttpClient) { }

  mostrarFuat(datosfuat: any){

    console.log(datosfuat)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf' })
    };

    this.http.post('http://hospitalvirtual.diresacajamarca.gob.pe:8088/fuat/ver', datosfuat, { responseType: 'arraybuffer' }).subscribe(
      (datos) => {


        var blob = new Blob([datos], { type: 'application/pdf' });
        var filename = 'FORMATO_FUAT.pdf';
        FileSaver.saveAs(blob, filename);
      this.url = URL.createObjectURL(blob)
     

       
      });


  }

  guardarFuat(fuat: any) {

    return this.http.post(environment.url_backend + 'fuat/guardar',fuat)

  }





}