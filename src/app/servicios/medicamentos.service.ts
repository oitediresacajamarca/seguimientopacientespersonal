import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  constructor(private http:HttpClient) { 

    
  }
  cargarMedicamentos(){
    return this.http.get<any>(environment.url_backend+'medicamento/listar')
  }
  cargarMedicamentosFiltrados(datos){
    return this.http.post<any>(environment.url_backend+'medicamento/filtrar',datos)
  }
}
