import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarteraServiciosService {

  constructor(private http: HttpClient) {


  }
  cargarServiciosIpress(COD_IPRESS: string) {
    return this.http.get<any[]>(environment.url_backend + 'ipress-cartera/ipress/' + COD_IPRESS)
  }
}
