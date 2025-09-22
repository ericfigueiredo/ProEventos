import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;
  public usuario: Usuario;
  private subscription: Subscription;

  // Textos para as modais
  public info: string;
  public modalAberta: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.subscription = this.usuarioService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  usuarioLogado(): boolean {
    return this.usuarioService.usuario_autenticado();
  }

  public usuario_administrador(): boolean{
    return this.usuarioService.usuario_administrador();
  }

  sair() {
    this.usuarioService.limpar_sessao();
    this.router.navigate(['/entrar']);
  }

  abrirModal(tipo: string) {
    if (tipo == 'about') {
      this.info = 'Sobre o sistema';
    }
    if (tipo == 'dados') {
      this.info = 'Meu Perfil';
    }
    if (tipo == 'novoUsuario') {
      this.info = 'Cadastrar Novo Usuário';
    }
    this.modalAberta = tipo;
  }

  fecharModal() {
    this.modalAberta = '';
  }
}
