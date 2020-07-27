import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistribucionGeograficaService {

  constructor(private http: HttpClient) { }
  devolverIpressPorIdDistrito(ID_DISTRITO: string) {
    return this.http.get<any[]>(environment.url_backend + 'ipress/distrito/'+ID_DISTRITO)
  }
}
