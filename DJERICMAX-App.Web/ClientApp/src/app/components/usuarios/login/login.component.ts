import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public logoTitle = "DJ PARA CASAMENTOS";
  public usuario;
  public usuaruiAutenticado: boolean;
  public email="";
  public senha="";

  constructor(private router: Router) {
    this.usuario =  new Usuario();
  }

  ngOnInit() {
  }

  entrar(){

    // alert(`E-mail: ${this.usuario.email} | Senha: ${this.usuario.senha}`);

    if (this.usuario.email == "djericmax@hotmail.com" && this.usuario.senha == "eusouodj") {

      sessionStorage.setItem("usuario-autenticado", "1");
      this.router.navigate(['/']);

      // this.usuaruiAutenticado = true;
    }
  }



}
