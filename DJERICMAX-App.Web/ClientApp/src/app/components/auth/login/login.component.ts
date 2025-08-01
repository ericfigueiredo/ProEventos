import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario;
  public returnUrl: string;
  public mensagem: string;
  // public usuaruiAutenticado: boolean;
  public ativar_spinner: boolean;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.usuario =  new Usuario();
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
  }

  entrar(){
    this.ativar_spinner = true;
    this.usuarioService.verificaUsuario(this.usuario)
    .subscribe(
      usuario_json => {
        // executa sem erros
        this.usuarioService.usuario = usuario_json;

        if (this.returnUrl == null) {
          this.router.navigate(['/']);
        }
        else{
          this.router.navigate([this.returnUrl]);
        }
      },
      err => {
        // console.log(err.error);
        this.mensagem = err.error;
        this.ativar_spinner = false;
      }
    );

    }
  }
