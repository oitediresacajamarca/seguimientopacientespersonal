import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionRegService {

  constructor(private http: HttpClient) { }
  guardar(atencionreg) {
    return this.http.post(environment.url_backend + 'atencion-reg/guardar', atencionreg);
  }
}
