import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  datosCliente:any[] = [];
  constructor() { }

  ngOnInit() {
    let infomracionUsuario = JSON.parse(localStorage.getItem('DatosGoogle'))
    console.log(infomracionUsuario)
    let {user} = infomracionUsuario;
    console.log(user);
    this.datosCliente = Object.values({user});
    console.log(this.datosCliente)
  }

 
}
