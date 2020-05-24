import { Component, OnInit, Input } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { UsuarioBase } from '../../interfaces/usuario-base';
var ngfaker = require('ng-faker');

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  constructor(private persona: PersonaService, private usu: UsuariosService) { }


  logueado: string;
  @Input()
  verNuevoUsuarios: boolean = false;
  colsambitos: any[];
  ambitoelegidos: any[] = [];
  numdocbuscar: string;
  avanceusuario: number = 0
  datgenerales: any = {
    numdoc: "",
    apellidopaterno: "",
    nombre: "",
    apellidomaterno: "",
    telef: "",
    correo: "",

  };





  usuariogen: string;
  clavegen: string;


  ngOnInit() {
    this.colsambitos = [
      {
        header: "Subregion",
        field: "NOMBRE_SUBREGION"
      },
      {
        header: "RED",
        field: "NOMBRE_RED"
      },
      {
        header: "MICRORED",
        field: "NOMBRE_MICRORED"
      },
      {
        header: "ESTABLECIMIENTO",
        field: "NOMBRE_IPRESS"
      }

    ]
  }

  buscarPersonal($event) {
    this.persona.devolverPersonaTrabajador(this.numdocbuscar).subscribe((datos) => {

      if (datos.respuesta[0].ID_PERSONA == 0) {


      } else {
        this.datgenerales.numdoc = datos.respuesta[0].NRO_DOCUMENTO;
        this.datgenerales.nombre = datos.respuesta[0].NOMBRES;
        this.datgenerales.apellidopaterno = datos.respuesta[0].APELLIDO_PAT;
        this.datgenerales.apellidomaterno = datos.respuesta[0].APELLIDO_MAT;
        //  this.datgenerales =datos.respuesta[0].DIRECCION
        this.datgenerales.telef = datos.respuesta[0].TELEFONO
        this.datgenerales.correo = datos.respuesta[0].CORREO



      }
    })

  }
  aniadirAmbito(e) {

    let am = e;

    this.ambitoelegidos.push(am)


  }

  generarContrasenia(seed: number = 4) {
    this.avanceusuario = 0
    this.avanceusuario = 30;

    this.usuariogen = this.datgenerales.nombre.slice(0, 1) +
      this.datgenerales.apellidopaterno + this.datgenerales.apellidomaterno.slice(0, 1);
    this.clavegen = this.numdocbuscar.slice(0, seed) + ngfaker.name.firstName();
    this.usu.verificar(this.usuariogen).subscribe((dat) => {
      if (dat.mensaje == "Existe") {
        this.generarContrasenia(seed + 1)
        this.avanceusuario = this.avanceusuario + 10;

      } else {
        this.avanceusuario = 100;
      }
    })

  }

  generarCuenta() {
   
    /*
    this.usuario.numero_doc = this.numdocbuscar
    this.usuario.username = this.usuariogen
    this.usuario.clave = this.clavegen;
    this.usuario.NOMBRES = this.datgenerales.nombre
    this.usuario.APELLIDO_PAT = this.datgenerales.apellidopaterno
    this.usuario.APELLIDO_MAT = this.datgenerales.apellidomaterno
    this.usuario.ambitos = this.ambitoelegidos;  
    this.usu.nuevo(this.usuario).subscribe((dat)=>{
      console.log(dat);
      
    });*/
  }

}
