import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  prepararPaciente(id_persona: number, nro_documento: string, ipress: string) {
    return this.http.post<any>(environment.url_backend + 'paciente/prepara/'+id_persona, { NRO_DOCUMENTO: nro_documento, COD_IPRESS: ipress })
  }
}
