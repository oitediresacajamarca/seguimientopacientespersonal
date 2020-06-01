import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {
  colegios = [{ "ID_COLEGIO": "1", "DESCRIPCION_COLEGIO": "PERSONAL DE SALUD SIN COLEGIATURA", "ESTADO": true }, { "ID_COLEGIO": "10", "DESCRIPCION_COLEGIO": "COLEGIO TECNOLOGO MEDICO DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "11", "DESCRIPCION_COLEGIO": "COLEGIO DE NUTRICIONISTAS DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "12", "DESCRIPCION_COLEGIO": "COLEGIO MEDICO VETERINARIO DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "13", "DESCRIPCION_COLEGIO": "COLEGIO DE INGENIEROS DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "2", "DESCRIPCION_COLEGIO": "COLEGIO MEDICO DE PERU", "ESTADO": true }, { "ID_COLEGIO": "3", "DESCRIPCION_COLEGIO": "COLEGIO QUIMICO FARMACEUTICO DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "4", "DESCRIPCION_COLEGIO": "COLEGIO ODONTOLOGICO DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "5", "DESCRIPCION_COLEGIO": "COLEGIO DE BIOLOGOS DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "6", "DESCRIPCION_COLEGIO": "COLEGIO DE OBSTETRICES DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "7", "DESCRIPCION_COLEGIO": "COLEGIO DE ENFERMEROS DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "8", "DESCRIPCION_COLEGIO": "COLEGIO DE TRABAJADORES SOCIALES DEL PERU", "ESTADO": true }, { "ID_COLEGIO": "9", "DESCRIPCION_COLEGIO": "COLEGIO DE PSICOLOGOS DEL PERU", "ESTADO": true }]

  constructor() { }
  devolverColegios() {
    return this.colegios;

  }
  devolverColegiosDropDown() {
    let res = []

    this.colegios.forEach(element => {
      let colegi: any = {}
      Object.assign(colegi, element);
      colegi.label = element.DESCRIPCION_COLEGIO;
      colegi.value = element.ID_COLEGIO;
      res.push(colegi)
    });
    return res;


  }

}
