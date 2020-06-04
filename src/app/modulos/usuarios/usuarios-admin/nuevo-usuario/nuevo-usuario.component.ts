import { Component, OnInit, Input } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { UsuarioBase } from '../../interfaces/usuario-base';
import { Usuario } from '../../clases/usuario';

import { Message } from 'primeng/api/message';
import { ConfirmationService } from 'primeng/api';
import { ProfesionService } from 'src/app/servicios/maestros/profesion.service';
import { ColegioService } from 'src/app/servicios/maestros/colegio.service';




@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  constructor(private persona: PersonaService, private usu: UsuariosService,
    private confirmationService: ConfirmationService, private maestr: ProfesionService,
    private colegios: ColegioService) { }
  cod_colegiatura: string;
  msgs: Message[] = [];
  logueado: string;
  colegiado: boolean = false;
  @Input()
  verNuevoUsuarios: boolean = false;
  colsambitos: any[];
  ambitoelegidos: any[] = [];
  ipressselect: any[] = [];
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
  datosprofesionales: any = {
    cod_profesion: 0,
    nombre_profesion: "",
    cod_colegiatura: "",
    colegio_profesional: "",
    especialidades: [{ cod_especialidad: "", nombre_especialidad: "" }]
  }

  especialidad: string;

  datoslaborales: any = {
    cod_ipress: 0,
    nombre_ipress: "",
    ipresse: [],
    fec_ingreso: ""

  }

  profesiones: any[]
  profesionselec: any;

  colegiost: any[];
  colegiselect: any;

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

    ];
    this.colegiost = this.colegios.devolverColegiosDropDown();
    this.maestr.cargar_profesiones().subscribe((datos) => {

      this.profesiones = [];
      datos.recordset.forEach(element => {
        let dato: any = {};
        Object.assign(dato, element);
        dato.label = element.DESCRIPCION_PROFESION;
        dato.value = element;
        this.profesiones.push(dato)

      });



    })
  }

  buscarPersonal($event) {

    this.persona.devolverPersonaTrabajador(this.numdocbuscar).subscribe((datos) => {
      console.log(datos)
      if (datos.ID_PERSONA == 0) {


      } else {
        this.datgenerales.numdoc = datos.NRO_DOCUMENTO;
        this.datgenerales.nombre = datos.NOMBRES;
        this.datgenerales.apellidopaterno = datos.APELLIDO_PAT;
        this.datgenerales.apellidomaterno = datos.APELLIDO_MAT;
        this.datgenerales.id_persona=datos.ID_PERSONA
        //  this.datgenerales =datos.respuesta[0].DIRECCION
        this.datgenerales.telef = datos.TELEFONO
        this.datgenerales.correo = datos.CORREO



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
    this.clavegen = this.numdocbuscar.slice(0, seed),
      this.usu.generaFakeNom().subscribe(dato => { 
        console.log(dato)
        this.clavegen = this.clavegen + dato });
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

    let usu = new Usuario()
    usu.APELLIDO_PAT = this.datgenerales.apellidopaterno;
    usu.APELLIDO_MAT = this.datgenerales.apellidomaterno;
    usu.NOMBRES = this.datgenerales.nombre;
    usu.ambitos = this.ambitoelegidos;
    usu.username = this.usuariogen;
    usu.COD_IPRESS = this.ipressselect[0].COD_IPRESS;
    usu.NOMBRE_IPRESS = this.ipressselect[0].NOMBRE_IPRESS;
    usu.CORREO = this.datgenerales.correo;
    usu.TELEFONO = this.datgenerales.telef;
    usu.clave = this.clavegen;
    usu.numero_doc = this.numdocbuscar
    usu.id_persona=this.datgenerales.id_persona

    usu.DATOS_PROFESIONALES.COD_COLEGIATURA = this.cod_colegiatura;
    usu.DATOS_PROFESIONALES.ID_COLEGIO = this.colegiselect as string
    let fi = this.colegiost.filter(dat => dat.value == this.colegiselect)

    usu.DATOS_PROFESIONALES.NOMBRE_COLEGIO = fi[0].label;

    usu.DATOS_PROFESIONALES.ID_PROFESION = this.profesionselec.ID_PROFESION;
    usu.DATOS_PROFESIONALES.NOMBRE_PROFESION = this.profesionselec.DESCRIPCION_PROFESION;
    usu.DATOS_PROFESIONALES.NOMBRE_ESPECIALIDAD = this.especialidad;
    console.log(usu);
    this.confirmationService.confirm({
      message: 'ESTA SEGURO DE CREAR EL USUARIO',
      header: 'CONFIRMCION',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usu.nuevo(usu).subscribe((dat) => {
          this.usuarioCreado();
        });
      },
      reject: () => {

      }
    });




  }
  usuarioCreado() {
    this.verNuevoUsuarios = false;

  }
  aniadirIpress(e) {
    this.ipressselect.push(e)
  }
  cambioprof(e) {
    
    this.colegiselect = e.value.ID_COLEGIO
    this.especialidad = e.value.ESPECIALIDAD
  }

}
