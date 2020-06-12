import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



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

  form: FormGroup;

  constructor(private fb: FormBuilder) {

   }
display=true
  ngOnInit() {


    this.form = this.fb.group({
      firstname: [this.defaultFirstname, Validators.required],
      lastname: [this.defaultLastname, Validators.required]
    });
  }

}
