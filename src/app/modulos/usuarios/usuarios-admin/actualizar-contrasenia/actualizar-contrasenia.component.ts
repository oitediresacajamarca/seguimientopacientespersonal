import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Personal } from 'src/app/interfaces/personal';
import { Persona } from 'src/app/interfaces/persona';
import { DATOSPROFESIONALES } from '../../interfaces/datos-profesionales';
import { Intercambio } from './intercambio';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Button } from 'primeng/button';
import { Sidebar } from 'primeng/sidebar';
import { MessageService } from 'primeng/api';






@Component({
  selector: 'app-actualizar-contrasenia',
  templateUrl: './actualizar-contrasenia.component.html',
  styleUrls: ['./actualizar-contrasenia.component.css'],

})
export class ActualizarContraseniaComponent implements OnInit {
  @Input() defaultFirstname: string;
  @Input() defaultLastname: string;
  @Output() submitForm = new EventEmitter<any>();
  @Output() cancelForm = new EventEmitter<void>();

  @ViewChild('guardar', { static: false }) guardar: Button
  @ViewChild('dialog', { static: false })
  dialog: Sidebar
  session
  nocoincide = false
  desabilitabot = true



  cambio: Intercambio = new Intercambio();

  formCambio: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private usuas: UsuariosService, private messageService: MessageService) {

  }
  display = true
  personapersonal: Persona = {
    NOMBRES: '',
    ID_PERSONA: 0,
    ID_TIPOD: 0,
    NRO_DOCUMENTO: '',
    ID_GENERO: 0,
    APELLIDO_PAT: '',
    APELLIDO_MAT: '',
    ID_DISTRITO: '',
    FECHA_NAC: '',
    TELEFONO: '',
    CORREO: '',
    IMAGEN_PERSONA: ''
  }
  datosProf: DATOSPROFESIONALES = {
    COD_COLEGIATURA: '',
    ID_COLEGIO: '',
    ID_PROFESION: '',
    NOMBRE_COLEGIO: '',
    NOMBRE_ESPECIALIDAD: '',
    NOMBRE_PROFESION: '',



  }

  ngOnInit() {
    this.session = JSON.parse(localStorage.getItem('datos'))
    console.log(this.session)
    this.personapersonal.APELLIDO_MAT = this.session.APELLIDO_MAT;
    this.personapersonal.APELLIDO_PAT = this.session.APELLIDO_PAT;
    this.personapersonal.NOMBRES = this.session.NOMBRES;
    this.personapersonal.NRO_DOCUMENTO = this.session.numero_doc;
    this.datosProf.COD_COLEGIATURA = this.session.DATOS_PROFESIONALES.COD_COLEGIATURA;
    this.datosProf.NOMBRE_PROFESION = this.session.DATOS_PROFESIONALES.NOMBRE_PROFESION;
    this.datosProf.NOMBRE_ESPECIALIDAD = this.session.DATOS_PROFESIONALES.NOMBRE_ESPECIALIDAD;
    this.cambio.username = this.session.username;
    this.cambio.newpassword = ''
    this.cambio.confirmpassword = ''
    this.desabilitabot = true


    this.formCambio = this.fb.group({
      username: new FormControl({ value: this.cambio.username, disabled: true }),
      password: [this.cambio.password],
      newpassword: [this.cambio.newpassword, Validators.required],
      confirmpassword: this.cambio.confirmpassword
    }, { validator: this.validarcoincidencia() });
  }

  rutaNula() {
    console.log("se oculto")
    this.router.navigate([{ outlets: { emergente: null } }]);

  }
  cerrarDialog() {
    this.dialog.visible = false;

  }
  validarcoincidencia() {
    return (fg: FormGroup) => {
      const clave1 = fg.controls['newpassword'].value
      const clave2 = fg.controls['confirmpassword'].value
      if (clave1 != clave2) {

        fg.setErrors({ nocincide: true })


        this.nocoincide = true
        return { nocincide: true };


      }
      else {
        this.nocoincide = false


        fg.setErrors(null)
        return null;
      }




    }

  }
  Guardar(values) {
    values.estado="actualizado"

    this.usuas.actualizarUsuarioPass(this.session.id_persona, values).subscribe(DATOS => {

      if (DATOS.nModified == 1) {
        this.messageService.add({ key: 'confirmacion', severity: 'success', summary: 'Actualizacion Exitosa', detail: 'Se actualizo correctamente el password' });
       
        setTimeout(() => {  this.dialog.visible = false; }, 2500);
        

      }
    })
  }

}
