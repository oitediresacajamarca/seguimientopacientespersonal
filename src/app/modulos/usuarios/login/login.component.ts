import { Component, OnInit } from '@angular/core';
import { DistribucionAdministrativaService } from 'src/app/servicios/distribucion-administrativa.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { AmbitoInterface } from '../interfaces/ambito-interface';
import { Ambito } from 'src/app/clases/ambito';
import { Nivel } from '../enums/nivel.enum';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { RouterLink, Router } from '@angular/router';

import { EstadosService } from 'src/app/servicios/estados.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  clave: string;
  SUBREGION: any[] = [];
  REDES: any[] = [];
  redes_filtradas: any[] = [];
  subregionSelect: any = 0;
  red_seleccionada: any = 0;
  MICROREDES_FILTRADAS: any[] = []
  microred_selecionada: any = '';
  ESTABLECIMIENTO_FILTRADO: any[] = [];
  establecimiento_seleccionado: any = '';
  ambitoselec: Ambito = new Ambito();
  ambitoq = {
    COD_SUBREGION: 0,
    COD_RED: 0,
    COD_MICRORED: 0,
    COD_IPRESS: 0
  }
  msgs=[]



  constructor(private disad: DistribucionAdministrativaService,
    private geo: GeografiaService, private usua: UsuariosService
    , private rout: Router, private estadoapp: EstadosService) { }

  ngOnInit() {
    this.SUBREGION = this.disad.devolver_subregiones();
    this.REDES = this.disad.devolver_redes();
  }
  cambioRegion(e) {


    this.ambitoselec.peso = e.value * Math.pow(10, Nivel.SREGION);
    this.ambitoselec.peso_sup = (e.value + 1) * Math.pow(10, Nivel.SREGION);
    this.ambitoselec.COD_SUBREGION = e.value;

    this.redes_filtradas = this.disad.devolver_redes_por_subregion(e.value);
    this.ambitoq.COD_SUBREGION = 1;
    this.ambitoq.COD_RED = 0
    this.ambitoq.COD_MICRORED = 0;
    this.ambitoq.COD_IPRESS = 0



  }
  cambioRed(e) {

    this.ambitoselec.COD_RED = e.value;
    this.ambitoselec.peso = this.ambitoselec.COD_SUBREGION * Math.pow(10, Nivel.SREGION) +
      this.ambitoselec.COD_RED * Math.pow(10, Nivel.RED);
    this.ambitoselec.peso_sup = this.ambitoselec.COD_SUBREGION * Math.pow(10, Nivel.SREGION) +
      (this.ambitoselec.COD_RED + 1) * Math.pow(10, Nivel.RED);
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

    this.ambitoq.COD_SUBREGION = 1;
    this.ambitoq.COD_RED = 1;
    this.ambitoq.COD_MICRORED = 0;
    this.ambitoq.COD_IPRESS = 0


  }
  devolver_establecimiento(e) {
    this.ESTABLECIMIENTO_FILTRADO = []

    this.ambitoselec.COD_MICRORED = e.value;
    this.ambitoselec.peso = this.ambitoselec.COD_SUBREGION * Math.pow(10, Nivel.SREGION) +
      this.ambitoselec.COD_RED * Math.pow(10, Nivel.RED) +
      this.ambitoselec.COD_MICRORED * Math.pow(10, Nivel.MICRORED);
    this.ambitoselec.peso_sup = this.ambitoselec.COD_SUBREGION * Math.pow(10, Nivel.SREGION) +
      this.ambitoselec.COD_RED * Math.pow(10, Nivel.RED) +
      (this.ambitoselec.COD_MICRORED + 1) * Math.pow(10, Nivel.MICRORED);

    this.geo.devolverIpressPorMicrored(e.value).subscribe((datos) => {
      datos.respuesta.forEach(element => {
        let ipress: any = {};
        ipress.label = element.NOMBRE;
        ipress.value = element.COD_IPRESS;
        this.ESTABLECIMIENTO_FILTRADO.push(ipress);

      });

    })

    this.ambitoq.COD_SUBREGION = 1;
    this.ambitoq.COD_RED = 1;
    this.ambitoq.COD_MICRORED = 1;
    this.ambitoq.COD_IPRESS = 0



  }
  cambio_establecimiento(e) {
    this.ambitoselec.COD_IPRESS = e.value;
    this.ambitoselec.peso = this.ambitoselec.COD_SUBREGION * Math.pow(10, Nivel.SREGION) +
      this.ambitoselec.COD_RED * Math.pow(10, Nivel.RED) +
      this.ambitoselec.COD_MICRORED * Math.pow(10, Nivel.MICRORED) +
      this.ambitoselec.COD_IPRESS * Math.pow(10, Nivel.IPRESS);

    this.ambitoselec.peso_sup = this.ambitoselec.COD_SUBREGION * Math.pow(10, Nivel.SREGION) +
      this.ambitoselec.COD_RED * Math.pow(10, Nivel.RED) +
      this.ambitoselec.COD_MICRORED * Math.pow(10, Nivel.MICRORED) +
      (this.ambitoselec.COD_IPRESS + 1) * Math.pow(10, Nivel.IPRESS);

  }


  IniciarSesion() {



    let ambito = {
      COD_SUBREGION: (this.subregionSelect + 100) * this.ambitoq.COD_SUBREGION,
      COD_RED: (this.red_seleccionada + 100) * this.ambitoq.COD_RED,
      COD_MICRORED: (this.microred_selecionada + 1000) * this.ambitoq.COD_MICRORED,
      COD_IPRESS: this.establecimiento_seleccionado
    }
    console.log(ambito)
    console.log(this.ambitoselec.peso)


    this.usua.login(this.username, this.clave, this.ambitoselec.peso).subscribe(dato => {

      if (dato.respuesta != null) {


        console.log(dato.respuesta);
        localStorage.setItem('datos', JSON.stringify(dato.respuesta))
        let cod1 = '', cod2 = '', cod3 = '', cod4 = ''
        if (ambito.COD_SUBREGION == 0) {
          cod1 = ''
        }
        else {
          cod1 = ambito.COD_SUBREGION.toString()
        }
        if (ambito.COD_RED == 0) {
          cod2 = ''
        }
        else {
          cod2 = ambito.COD_RED.toString()
        }
        if (ambito.COD_MICRORED == 0) {
          cod3 = ''
        }
        else {
          cod3 = ambito.COD_MICRORED.toString()
        }

        this.estadoapp.cod_con = cod1 + '' + cod2 + '' + cod3 + '' + ambito.COD_IPRESS;

        this.rout.navigate(['admin/panel']);


      }else{

        this.msgs.push({ severity: 'error', summary: 'USUARIO O AMBITO DE ACCESO INCORRECTO', closable: 'false', detail: '', key: 'mensagesgenerales' });
      }

    });
  }



}
