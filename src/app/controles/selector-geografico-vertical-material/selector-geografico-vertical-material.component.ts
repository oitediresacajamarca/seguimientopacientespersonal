import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';


@Component({
  selector: 'app-selector-geografico-vertical-material',
  templateUrl: './selector-geografico-vertical-material.component.html',
  styleUrls: ['./selector-geografico-vertical-material.component.css']
})
export class SelectorGeograficoVerticalMaterialComponent implements OnInit {

  constructor(private geos: GeografiaService) { }
  @Output() selecionoDistrito = new EventEmitter<any>()
  PROVINCIAS
  PROVINCIA_SELECCIONADA
  DISTRITOS: any[] = []
  ngOnInit() {
    this.PROVINCIAS = [
      { label: "CAJAMARCA", value: "0601" },
      { label: "CAJABAMBA", value: "0602" },
      { label: "CELENDIN", value: "0603" },
      { label: "CHOTA", value: "0604" },
      { label: "CONTUMAZA", value: "0605" },
      { label: "CUTERVO", value: "0606" },
      { label: "HUALGAYOC", value: "0607" },
      { label: "JAEN", value: "0608" },
      { label: "SAN IGNACIO", value: "0609" },
      { label: "SAN MARCOS", value: "0610" },
      { label: "SAN MIGUEL", value: "0611" },
      { label: "SAN PABLO", value: "0612" },
      { label: "SANTA CRUZ", value: "0613" }]
  }
  async cambiarProvincia(e) {
    this.geos.devolverDistritos(this.PROVINCIA_SELECCIONADA).subscribe((datos) => {
      console.log(datos)
      this.DISTRITOS = datos.respuesta
    })

  }

  cambioDistrito(e) {
    this.selecionoDistrito.emit(e)
  }



}
