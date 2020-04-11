import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {
  usuario:string;
  clave:string;

  constructor(private usu:UsuariosService,private rout:Router) { }

  ngOnInit() {
  }
  Login(){
  this.usu.login(this.usuario,this.clave).subscribe((datos)=>{
      if(datos.respuesta.logueado ==true){
        
          this.rout.navigate(['personal.jsp']);
      }
      else{
        this.rout.navigate(['']);
        this.usuario='';
        this.clave='';
      }
    
  });
  }

}
