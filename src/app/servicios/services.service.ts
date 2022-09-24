import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  { rickandmorty } from '../Modelo/listado/Listado';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
let provider =new OAuthProvider('microsoft.com')
provider.setCustomParameters({
  // Force re-consent.
  prompt: 'consent',
  // Target specific email with login hint.
  tenant: 'b7a14df2-6d9e-4da3-91eb-c8c9c5b5129c'
});

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  // url = environment.url;

  constructor(private http: HttpClient , private AngFire: AngularFireAuth, private bd:AngularFirestore) { }

  login(correo:string, contrasena:string){
    return new Promise((resolve,rejects)=>{
    this.AngFire.signInWithEmailAndPassword(correo,contrasena).then((usuario) => {
      console.log(usuario)
      resolve(usuario)
    }).catch(error=> rejects(error))
  })
  }

  registro(correo:string,
    contrasena:string,
    telefono:string,
    fechanacimiento:string,
    nombreCompleto:string){
      return new Promise((resolve,rejects)=>{
        this.AngFire.createUserWithEmailAndPassword(correo,contrasena).then((usuario:any) => {
          console.log(usuario)
          const id = usuario.user.uid
          this.bd.collection('/Usuarios').doc(id).set({
          telefono:telefono,
          fechanacimiento:fechanacimiento,
          nombreCompleto:nombreCompleto,
          uuid:id
          })

          resolve(usuario)
        }).catch(error=> rejects(error))
      })
      }

      loginWithGoogle(){
        return this.AngFire.signInWithPopup(new GoogleAuthProvider())
      }

      
      loginWithMicrosoft(){
       return this.AngFire.signInWithPopup(provider)
      }

  }
  

