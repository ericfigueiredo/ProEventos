import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usuario;
  public returnUrl: string;
  public mensagem: string;
  public usuarioLogado;
  public ativar_spinner: boolean;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.usuario =  new Usuario();
  }

  ngOnInit(): void {
    this.usuarioLogado = JSON.parse(sessionStorage.getItem('usuario-autenticado'));
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
  }

  entrar(){
    this.ativar_spinner = true;
    this.usuarioService.verificaUsuario(this.usuario)
    .subscribe(
      usuario_json => {
        this.usuarioService.usuario = usuario_json;
        if (this.returnUrl == null) {
          this.router.navigate(['/']);
        } else{
          this.router.navigate([this.returnUrl]);
        }
      }, err => {
        this.mensagem = err.error;
        this.ativar_spinner = false;
      });
    }

  }
