import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { PersonaService } from 'src/app/servicios/servicios/persona.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { SolicitudService } from 'src/app/servicios/servicios/solicitud.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  tiposdoc:SelectItem[];

 

  verpanelregistro:boolean=false;
  noexistepaciente:boolean=false;
  msgs:any[];
  msgvalidaper:any[];
  fechasolicitud:Date=new Date();
  
  provincias:SelectItem[];
  provinciaselecionada:string;
  distritos:SelectItem[];
  verpaneldatosgenerales:boolean=false;
  generos:SelectItem[];
  verpanellogin:boolean=false;
  nombres_nuevo:string;
  ape_pat_nuevo:string;
  ape_mat_nuevo:string;
  generosele:string;
  tipodocseleccionado:string;
  numerodoc:string;
  FECNAC:Date;
  distritoselecionado:string;
  direccion:string;

  obsevaciones:string;
  telefcon1:string;
  telefcon2:string;
  correo:string;
  es:any;
  letrasyespacio:RegExp=/[a-zA-Z ]/;
  vermensajeconfirmacion:boolean=false;
 

  constructor(private pers:PersonaService,private geo:GeografiaService,private sol:SolicitudService,private confirmationService: ConfirmationService,private mesgs:MessageService) { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","MI","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  };
    this.tiposdoc = [
      {label:'DNI', value:'1'},
      {label:'CARNET', value:'2'},
      {label:'PASS', value:'3'}
    ]
    this.generos = [
      {label:'MASCULINO', value:'1'},
      {label:'FEMENINO', value:'2'}
       ]
    this.msgs = [];

    this.provincias=[
      {label:"CAJAMARCA",value:"0601"},
      {label:"CAJABAMBA",value:"0602"},
      {label:"CELENDIN",value:"0603"},
      {label:"CHOTA",value:"0604"},
      {label:"CONTUMAZA",value:"0605"},
      {label:"CUTERVO",value:"0606"},
      {label:"HUALGAYOC",value:"0607"},
      {label:"JAEN",value:"0608"},
      {label:"SAN IGNACIO",value:"0609"},
      {label:"SAN MARCOS",value:"0610"},
      {label:"SAN MIGUEL",value:"0611"},
      {label:"SAN PABLO",value:"0612"},
      {label:"SANTA CRUZ",value:"0613"}]
     
  }
  solicitaAtencion(){

    if(this.numerodoc=='' ){alert('debera de ingresar un numero de documento valido')}
    if(this.FECNAC==null ){alert('debera de ingresar su fecha de nacimiento ')}

   if(this.numerodoc!='' && this.FECNAC !=null ){
 
  
    this.pers.devolverPersona(this.tipodocseleccionado,this.numerodoc,this.FECNAC.getFullYear()+'-'+(this.FECNAC.getMonth()+1)+'-'+this.FECNAC.getDate()).subscribe((dat)=>{
      

      this.msgvalidaper=[]
      this.mesgs.clear();

      if(dat.respuesta.existeper!="" && dat.respuesta.coincidefecha==""){ 
      
        this.msgvalidaper.push({severity:'info', summary:'Datos no validos', detail:'',key:'validapersona'});
      }else{



        if( dat.respuesta.tienesoliditudpendiente!=""){
     

          this.msgvalidaper.push({severity:'info', summary:' Usted ya tiene una solicitud pendiente', detail:'',key:'validapersona'});
          this.verpanelregistro=false;
        }

        if(dat.respuesta.existeper==""){

          this.verpanelregistro=true;
          this.verpaneldatosgenerales=true;

        }  

        
        if(dat.respuesta.existeper!="" && dat.respuesta.tienesoliditudpendiente==""){

          this.verpanelregistro=true;
          this.verpaneldatosgenerales=false;
          this.mesgs.add({severity:'success', summary:'PACIENTE IDENTIFICADO:', detail:'Para solicitar atencion complete el siguiente formulario: '});

        }
     

          

         
         
          }
         });
  
   
       }
       
  }
  cambioProvincia(){

    this.geo.devolverDistritos(this.provinciaselecionada).subscribe((dat)=>{console.log(this.distritos=dat.respuesta)});
  }
 resetearData(){
   this.nombres_nuevo='';
   this.ape_mat_nuevo='';
   this.ape_pat_nuevo='';
   this.numerodoc='';
   this.FECNAC=null;
   this.telefcon1=null;
   this.telefcon2=null;
   this.correo=null;
   this.obsevaciones=null;
   this.direccion=null;

 }


 guardarPaciente(){

this.confirmationService.confirm({
  message: 'ESTAS SEGURO DE REGISTRARTE PARA SOLICITAR ATENCION?',
  accept: () => {
     

        let PER= {
        "ID_PERSONA":this.tipodocseleccionado+this.numerodoc,
        "ID_TIPOD":this.tipodocseleccionado,
        "NRO_DOCUMENTO":this.numerodoc,
        "ID_GENERO":this.generosele,
        "NOMBRES":this.nombres_nuevo,
        "APELLIDO_PAT":this.ape_pat_nuevo,
        "APELLIDO_MAT":this.ape_mat_nuevo,
        "ID_DISTRITO":this.distritoselecionado,
        "FECHA_NAC":this.FECNAC};

      let solic=
              {
            "ID_PACIENTE":this.tipodocseleccionado+this.numerodoc,
            "DESCRIPCION":this.obsevaciones,
            "TELEF_CONTACTO":this.telefcon1,
            "TELEF_CONTACTO2":this.telefcon2,
            "DOMICILIO_ACTUAL":this.direccion,
            "FECHA_SOLICITUD":this.fechasolicitud,
            "ESTADO":"P",
            "ID_DISTRITO":this.distritoselecionado,
            "CORREO":this.correo
            }
  if(   this.verpaneldatosgenerales){
      this.pers.guardarPersona({root:PER}).subscribe((dat)=>{

        
         this.sol.guardarSolicitud({root:solic}).subscribe((solicito)=>{

        // this.vermensajeconfirmacion=true;
          this.confirmationService.confirm({
            message: 'Su solicitud ha sido guardada exitosamente Pronto el personal medico se comunicara con usted segun la informacion proporcionada',
            accept: () => {
              this.verpanelregistro=false;
              this.resetearData();
           },key:'final'
         
        
        });
        });
      });

    }

    else{

      this.sol.guardarSolicitud({root:solic}).subscribe((solicito)=>{

     //   this.vermensajeconfirmacion=true;

              this.confirmationService.confirm({
                message: 'Su solicitud ha sido guardada exitosamente Pronto el personal medico se comunicara con usted segun la informacion proporcionada',
                accept: () => {
                  this.verpanelregistro=false;
                  this.resetearData();
              },key:'final'
            
            });

       
      });

    }

    this.mesgs.add({severity:'info', summary:'Info Message', detail:'Se agrego la solicitud de atencion pronto nos comunicaremos con usted'});
  
       
      }
      })



 }

 cancelarSolicitud(){
    this.verpanelregistro=false;
    this.resetearData();

 }



}
