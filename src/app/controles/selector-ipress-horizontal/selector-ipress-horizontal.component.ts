import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Table } from 'primeng/table';
import { MorbilidadesService } from 'src/app/servicios/morbilidades.service';
import { MorbilidadesTablaItem } from 'src/app/interfaces/morbilidades-tabla-item';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { DistribucionAdministrativaService } from 'src/app/servicios/distribucion-administrativa.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { EstadosService } from 'src/app/servicios/estados.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-selector-ipress-horizontal',
  templateUrl: './selector-ipress-horizontal.component.html',
  styleUrls: ['./selector-ipress-horizontal.component.css']
})
export class SelectorIpressHorizontalComponent implements OnInit {
  SUBREGION: any[] = [];
  REDES: any[] = [];
  redes_filtradas: any[] = [];
  subregionSelect: any = 0;
  red_seleccionada: any = 0;
  MICROREDES_FILTRADAS: any[] = []
  microred_selecionada: any = '';
  ESTABLECIMIENTO_FILTRADO: any[] = [];
  establecimiento_seleccionado: any = '';

  listamorbilidades: MorbilidadesTablaItem[];

  selectedCustomers: MorbilidadesTablaItem[];
  morbilidadesselec: string[];
  public codigosSelect: string[];
  public selectioncie: any;
  ambito:any
  @Output()
  seleccionoIpress = new EventEmitter<any>();
  @Output()
  cambioAmbito = new EventEmitter<any>();

  statuses: any[];

  loading: boolean = true;

  @ViewChild('dt', { static: false }) table: Table;
  @Output() cambioSelecion: EventEmitter<string[]> = new EventEmitter()
  constructor(private morb: MorbilidadesService, private disad: DistribucionAdministrativaService,
    private geo: GeografiaService, private usua: UsuariosService
    , private rout: Router, private estadoapp: EstadosService) { }



  ngOnInit() {
    this.SUBREGION = this.disad.devolver_subregiones();
    this.REDES = this.disad.devolver_redes();
  }
  calcularAmbito() {
    let sr = this.SUBREGION.find((dat) => { return this.subregionSelect == dat.value })
    if (sr) {
      sr = sr.label
    } else {
      sr = ""
    }

    let red = this.redes_filtradas.find((dat) => { return this.red_seleccionada == dat.value })
    if (red) {
      red = red.label
    } else {
      red = ""
    }
    let mr = this.MICROREDES_FILTRADAS.find((dat) => { return this.microred_selecionada == dat.value })
    if (mr) {
      mr = mr.label
    } else {
      mr = ""
    }
    let ce = this.ESTABLECIMIENTO_FILTRADO.find((dat) => { return this.establecimiento_seleccionado == dat.value })
    if (ce) {
      ce = ce.label
    } else {
      ce = ""
    }
    this.ambito = {
      "SUB_REGION": sr,
      "RED": red,
      "MICRORED": mr,
      "NOMBRE_ESTABLECIMIENTO": ce,

    }
    this.cambioAmbito.emit(this.ambito)


  }


  cambioRegion(e) {
    this.redes_filtradas = this.disad.devolver_redes_por_subregion(e.value);
    this.red_seleccionada=null
    this.MICROREDES_FILTRADAS = []
    this.ESTABLECIMIENTO_FILTRADO = []
    this.calcularAmbito()

  }
  cambioRed(e) {

    this.MICROREDES_FILTRADAS = [];
    this.geo.devolverMicroredPorRed(e.value).subscribe((datos) => {
      datos.respuesta.forEach(element => {
        let vari: any = {}
        Object.assign(element, vari);
        vari.label = element.NOMBRE;
        vari.value = element.ID_MICRORED;
        this.MICROREDES_FILTRADAS.push(vari)
      });

      this.ESTABLECIMIENTO_FILTRADO = []
      this.calcularAmbito()
    })

  }
  devolver_establecimiento(e) {
    this.ESTABLECIMIENTO_FILTRADO = []
    this.geo.devolverIpressPorMicrored(e.value).subscribe((datos) => {
      datos.respuesta.forEach(element => {
        let ipress: any = {};
        ipress.label = element.NOMBRE;
        ipress.value = element.COD_IPRESS;
        this.ESTABLECIMIENTO_FILTRADO.push(ipress);

      });

    })
    this.calcularAmbito()
  }
  cambio_establecimiento(e) {
    this.establecimiento_seleccionado = e.value
    this.calcularAmbito()
    this.seleccionoIpress.emit(this.establecimiento_seleccionado)

  }
  selecionar_Ipress(cod_ipres: string) {
    this.disad.devolver_Ipress(cod_ipres).subscribe(dato => {

      let ipress = dato.recordset[0]
      this.subregionSelect = ipress.ID_SUBREGION
      this.redes_filtradas = this.disad.devolver_redes_por_subregion(ipress.ID_SUBREGION);
      this.red_seleccionada = ipress.ID_RED
      this.MICROREDES_FILTRADAS = [];
      this.geo.devolverMicroredPorRed(ipress.ID_RED).subscribe((datos) => {
        datos.respuesta.forEach(element => {
          let vari: any = {}
          Object.assign(element, vari);
          vari.label = element.NOMBRE;
          vari.value = element.ID_MICRORED;
          this.MICROREDES_FILTRADAS.push(vari)

        });
        this.microred_selecionada = ipress.ID_MICRORED;
      })
      this.ESTABLECIMIENTO_FILTRADO = []
      this.geo.devolverIpressPorMicrored(ipress.ID_MICRORED).subscribe((datos) => {
        datos.respuesta.forEach(element => {
          let ipress: any = {};
          ipress.label = element.NOMBRE;
          ipress.value = element.COD_IPRESS;
          this.ESTABLECIMIENTO_FILTRADO.push(ipress);

        });



      })

    })

  }


}
