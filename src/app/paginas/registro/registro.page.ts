import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  

  form:FormGroup

  constructor(private formBuilder: FormBuilder, private servicio: ServicesService ) { 
  this.form = this.formBuilder.group({    
    correo: ['', Validators.required],
    contrasena: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    nombreCompleto: ['', [Validators.required]]
  })
}
  

  ngOnInit() {
  }
registrarse(){
  const formulario = this.form;
  if(formulario.valid){
  this.servicio.registro(
    formulario.get('correo').value,
  formulario.get('contrasena').value,
  formulario.get('telefono').value,
  formulario.get('fechaNacimiento').value,
  formulario.get('nombreCompleto').value,
  
  ).then ((respuesta) => {
    console.log (respuesta)
  }).catch  ((error) => {
    console.log (error)
  })
  }
}
}
