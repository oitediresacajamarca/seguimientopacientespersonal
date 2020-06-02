import { Component, OnInit } from '@angular/core';
import { DistribucionAdministrativaService } from 'src/app/servicios/distribucion-administrativa.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-selector-ipress',
  templateUrl: './selector-ipress.component.html',
  styleUrls: ['./selector-ipress.component.css']
})
export class SelectorIpressComponent implements OnInit {
  SUBREGION: any[] = [];
  REDES: any[] = [];
  redes_filtradas: any[] = [];
  subregionSelect: any = 0;
  red_seleccionada: any = 0;
  MICROREDES_FILTRADAS: any[] = []
  microred_selecionada: any = '';
  ESTABLECIMIENTO_FILTRADO: any[] = [];
  establecimiento_seleccionado: any = '';


  constructor(private disad: DistribucionAdministrativaService,
    private geo: GeografiaService, private usua: UsuariosService
    , private rout: Router, private estadoapp: EstadosService) { }

  ngOnInit() {
    this.SUBREGION = this.disad.devolver_subregiones();
    this.REDES = this.disad.devolver_redes();
  }


  cambioRegion(e) {




    this.redes_filtradas = this.disad.devolver_redes_por_subregion(e.value);




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





  }
  cambio_establecimiento(e) {



  }
  selecionar_Ipress(cod_ipres: string) {
    this.disad.devolver_Ipress(cod_ipres).subscribe(dato => {
      console.log(dato.recordset[0])
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
        this.establecimiento_seleccionado = ipress.CODIGO_RENIPRESS

      })











    })


  }


}
