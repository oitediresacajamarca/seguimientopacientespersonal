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
  @Output() selecionoProvincia = new EventEmitter<any>()
  PROVINCIAS
  PROVINCIA_SELECCIONADA
  DISTRITOS: any[] = []

  ngOnInit() {
    this.PROVINCIAS = [
      {
        value: "0601",
        label: "CAJAMARCA",
        LONG: -7.846795190690527e+001,
        LAT: -7.221607518076887e+000
      },
      {
        value: "0602",
        label: "CAJABAMBA",
        LONG: -7.808080275884095e+001,
        LAT: -7.554070827124002e+000
      },
      {
        value: "0603",
        label: "CELENDIN",
        LONG: -7.819268054744161e+001,
        LAT: -6.823542999841355e+000
      },
      {
        value: "0604",
        label: "CHOTA",
        LONG: -7.874967128988915e+001,
        LAT: -6.428997980881937e+000
      },
      {
        value: "0605",
        label: "CONTUMAZA",
        LONG: -7.892793123578566e+001,
        LAT: -7.326732621318241e+000
      },
      {
        value: "0606",
        label: "CUTERVO",
        LONG: -7.874522991912332e+001,
        LAT: -6.179567325839192e+000
      },
      {
        value: "0607",
        label: "HUALGAYOC",
        LONG: -7.860309128231472e+001,
        LAT: -6.716110719427650e+000
      },
      {
        value: "0608",
        label: "JAEN",
        LONG: -7.900577776487886e+001,
        LAT: -5.697088670516294e+000
      },
      {
        value: "0609",
        label: "SAN IGNACIO",
        LONG: -7.898026943192322e+001,
        LAT: -5.216114808839988e+000
      },
      {
        value: "0610",
        label: "SAN MARCOS",
        LONG: -7.810406047654159e+001,
        LAT: -7.342407029038857e+000
      },
      {
        value: "0611",
        label: "SAN MIGUEL",
        LONG: -7.898569987572894e+001,
        LAT: -6.956815850641235e+000
      },
      {
        value: "0612",
        label: "SAN PABLO",
        LONG: -7.878327225412937e+001,
        LAT: -7.091819538789637e+000
      },
      {
        value: "0613",
        label: "SANTA CRUZ",
        LONG: -7.889301781847736e+001,
        LAT: -6.656056670071060e+000
      }
    ]
  }
  async cambiarProvincia(e) {
    this.geos.devolverDistritos(this.PROVINCIA_SELECCIONADA).subscribe((datos) => {
      this.DISTRITOS = datos.respuesta
    })
    let ret = this.PROVINCIAS.find((provincia) => { return provincia.value == this.PROVINCIA_SELECCIONADA })
    this.selecionoProvincia.emit(ret)

  }

  cambioDistrito(e) {
    this.selecionoDistrito.emit(e)
  }



}
