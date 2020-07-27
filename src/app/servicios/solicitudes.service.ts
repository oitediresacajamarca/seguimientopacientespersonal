import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) {

  }
  devolverColumnasSolicitudes() {
    return this.http.get<any>(environment.ipmicroservicios + 'metadatos/tabla/SOLICITUDES_SEGUIMIENTO');
  }

  devolverDatosSolicitudes(codigo: string) {
    return this.http.get<any>(environment.url_backend + 'solicitudes/' + codigo);

  }

  cerrarSolicitud(solicitud: any) {
    return this.http.get('http://' + environment.ip_backend + '/solicitudes/solicitud/cerrar/' + solicitud);
  }
  nuevaSolicitud(datos) {
    return this.http.post(environment.url_backend + 'solicitudes-atencion/nueva/', datos);
  }
}
