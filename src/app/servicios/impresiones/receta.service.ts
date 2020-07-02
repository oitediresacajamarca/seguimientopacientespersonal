import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  url

  constructor(private http:HttpClient) { }


  mostrarReceta(datosfuat: any) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf' })
    };

    this.http.post('http://hospitalvirtual.diresacajamarca.gob.pe:8088/receta/ver', datosfuat, { responseType: 'arraybuffer' }
   ).subscribe(
      (datos) => {

        console.log(datosfuat)
        var blob = new Blob([datos], { type: 'application/pdf' });
        var filename = 'RECETA.pdf';
        FileSaver.saveAs(blob, filename);
        this.url = URL.createObjectURL(blob)
      });


}
}