import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { UsuarioService } from './../../../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public logoTitle = "DJ PARA CASAMENTOS";
  public usuario;
  public usuaruiAutenticado: boolean;
  public returnUrl: string;
  public email="";
  public senha="";

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute;
    private usuarioService: UsuarioService
  ) {
    this.usuario =  new Usuario();
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
  }

  entrar(){

    this.usuarioService.verificaUsuario(this.usuario)
    .subscribe(
      data => {

      },
      err => {

      }
    );

    }
  }



}
