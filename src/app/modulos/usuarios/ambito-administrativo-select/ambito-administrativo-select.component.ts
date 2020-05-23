import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DistritosService } from 'src/app/servicios/distritos.service';
import { GeografiaService } from 'src/app/servicios/servicios/geografia.service';
import { AmbitoInterface } from '../interfaces/ambito-interface';
import { Nivel } from '../enums/nivel.enum';


@Component({
  selector: 'app-ambito-administrativo-select',
  templateUrl: './ambito-administrativo-select.component.html',
  styleUrls: ['./ambito-administrativo-select.component.css']
})
export class AmbitoAdministrativoSelectComponent implements OnInit {

  constructor(private geo: GeografiaService) { }

  subregiones: SelectItem[] = [];
  redes: any[];
  sregionesSelect: SelectItem;
  microredes: SelectItem[];
  redes_filtradas: any[];
  ipresses: any[];
  @Output()
  selecionoAmbito :EventEmitter<any>=new EventEmitter()

  ambitoSelect: AmbitoInterface = {
    COD_IPRESS: 0,
    COD_MICRORED: 0,
    COD_RED: 0,
    COD_SUBREGION: 0,
    cod_ambito: "06",
    tipo_ambito: "REGION",
    peso: 600000000000,
    nivel: Nivel.RED,
    NOMBRE_IPRESS: "",
    NOMBRE_MICRORED: "",
    NOMBRE_RED: "",
    NOMBRE_SUBREGION: ""
  }
  ngOnInit() {


    this.subregiones = [

      { label: "CAJAMARCA", value: "1" },
      { label: "CHOTA", value: "2" },
      { label: "CUTERVO", value: "3" },
      { label: "JAEN", value: "4" }
    ];
    this.redes = [
      { label: "CONTUMAAZA", value: 1, subregion: 1 },
      { label: "CAJAMARCA", value: 2, subregion: 1 },
      { label: "CELENDIN", value: 3, subregion: 1 },
      { label: "SAN MARCOS", value: 4, subregion: 1 },
      { label: "CAJABAMBA", value: 5, subregion: 1 },
      { label: "SAN MIGUEL", value: 6, subregion: 1 },
      { label: "SAN PABLO", value: 7, subregion: 1 },
      { label: "CHOTA", value: 8, subregion: 2 },
      { label: "BAMBAMARCA", value: 9, subregion: 2 },
      { label: "SANTA CRUZ", value: 10, subregion: 2 },
      { label: "CUTERVO", value: 11, subregion: 3 },
      { label: "SOCOTA", value: 12, subregion: 3 },
      { label: "JAEN", value: 13, subregion: 4 },
      { label: "SAN IGNACION", value: 14, subregion: 4 },
    ]
    this.redes_filtradas = this.redes;



  }

  cambioSubregion(e) {
    console.log(e);

    this.redes_filtradas = this.redes.filter(red => red.subregion == e.value)
    this.microredes = []
    this.ipresses = []
    this.ambitoSelect.cod_ambito = e.value;
    this.ambitoSelect.tipo_ambito = 'SREG';
    this.ambitoSelect.COD_SUBREGION = e.value;
    this.ambitoSelect.nivel = Nivel.SREGION;
    this.ambitoSelect.peso = e.value * Math.pow(10, this.ambitoSelect.nivel);
    this.ambitoSelect.NOMBRE_SUBREGION =    this.subregiones.find(sub=>sub.value==e.value).label;
    this.ambitoSelect.NOMBRE_RED="";
    

  }
  cambioRed(e) {

    this.microredes = [];
    this.geo.devolverMicroredPorRed(e.value).subscribe(datos => {

      datos.respuesta.forEach(dat => {
        let microred: any = {};
        microred.label = dat.NOMBRE;
        microred.value = dat.ID_MICRORED;
        this.microredes.push(microred)
      });

      this.ambitoSelect.COD_RED = e.value;
      this.ambitoSelect.cod_ambito = e.value;
      this.ambitoSelect.nivel = Nivel.RED;
      this.ambitoSelect.peso = this.ambitoSelect.COD_SUBREGION * Math.pow(10, Nivel.SREGION) + this.ambitoSelect.COD_RED * Math.pow(10, Nivel.RED)
      this.ambitoSelect.NOMBRE_RED =   this.redes_filtradas.find(sub=>sub.value==e.value).label;
     
    })

  }
  cambioMicroRed(e) {

    this.ambitoSelect.COD_MICRORED = e.value;
    this.ambitoSelect.cod_ambito = e.value;
    this.ambitoSelect.nivel = Nivel.MICRORED;
    this.ambitoSelect.peso = this.ambitoSelect.COD_SUBREGION * Math.pow(10, Nivel.SREGION)
      + this.ambitoSelect.COD_RED * Math.pow(10, Nivel.RED) + this.ambitoSelect.COD_MICRORED * Math.pow(10, Nivel.MICRORED)
    console.log(this.ambitoSelect)
    this.geo.devolverIpressPorMicrored(e.value).subscribe((datos) => {

      this.ipresses = [];
      datos.respuesta.forEach(element => {

        let ipress: any = {}
        ipress.value = element.COD_IPRESS;
        ipress.label = element.NOMBRE;

        this.ipresses.push(ipress);
      });
    })
    this.ambitoSelect.NOMBRE_MICRORED =    this.microredes.find(sub=>sub.value==e.value).label;;
  }

  cambioEstablecimiento(e) {

    this.ambitoSelect.COD_IPRESS = e.value;
    this.ambitoSelect.cod_ambito = e.value;
    this.ambitoSelect.nivel = Nivel.IPRESS;
    this.ambitoSelect.peso = this.ambitoSelect.COD_SUBREGION * Math.pow(10, Nivel.SREGION)
      + this.ambitoSelect.COD_RED * Math.pow(10, Nivel.RED) + this.ambitoSelect.COD_MICRORED * Math.pow(10, Nivel.MICRORED)
      + this.ambitoSelect.COD_IPRESS * Math.pow(10, 0);
    this.ambitoSelect.NOMBRE_IPRESS =   this.ipresses.find(sub=>sub.value==e.value).label;
    console.log(this.ambitoSelect)


  }
  ambitoSelecionado(){
 
    let sel={}
    Object.assign(sel,this.ambitoSelect)
    this.selecionoAmbito.emit(sel);
    this.ambitoSelect={
      COD_IPRESS: 0,
      COD_MICRORED: 0,
      COD_RED: 0,
      COD_SUBREGION: 0,
      cod_ambito: "06",
      tipo_ambito: "REGION",
      peso: 600000000000,
      nivel: Nivel.RED,
      NOMBRE_IPRESS: "",
      NOMBRE_MICRORED: "",
      NOMBRE_RED: "",
      NOMBRE_SUBREGION: ""
    }
   
    

  }

}

