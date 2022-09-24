import { Component, OnInit } from '@angular/core';
import { personajes } from '../Modelo/listado/Listado';
import { ServicesService } from '../servicios/services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  personaje: personajes[] = [];

  correo:string;
  contrasena:string;

  constructor(private servicio: ServicesService, private router: Router) {}

  ngOnInit(){
    // this.servicio.obtenerPersonajes().subscribe(data => {
    //   this.personaje = data.results;
    //   console.log(this.personaje)
    // },error=>{console.log(error)})
  }
  loguearse(){
    this.servicio.login(this.correo,this.contrasena).then((respuesta )=> {
      console.log(respuesta)
    }).catch(error => alert('Datos incorrectos ' + error));
  }

  
  loguearseGoogle(){
    this.servicio.loginWithGoogle().then((data)=>{
      console.log(data.user.multiFactor);
      localStorage.setItem('DatosGoogle', JSON.stringify(data.user.multiFactor));
      this.router.navigate(['/principal']);
    },error=>{console.log(error)})
  }

  loguearseMicrosoft(){
    this.servicio.loginWithMicrosoft().then((data)=>{
      console.log(data.user.multiFactor);
      localStorage.setItem('DatosMicrosoft', JSON.stringify(data.user.multiFactor));
      this.router.navigate(['/principal']);
    },error=>{console.log(error)})
  }
}
