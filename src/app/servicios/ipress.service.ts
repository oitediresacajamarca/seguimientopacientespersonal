import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpressService {

  constructor(private http: HttpClient) { }
  
  getIpress(cod_ipress) {
    return this.http.get(environment.url_backend + 'ipress/' + cod_ipress);

  }
}
