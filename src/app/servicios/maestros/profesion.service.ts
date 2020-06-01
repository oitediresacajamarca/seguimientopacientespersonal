import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {
  profesiones: any[];
  constructor(private http: HttpClient) { }

  cargar_profesiones():any {

    return this.http.get(environment.url_backend + 'profesion/profesiones');
  }



}
