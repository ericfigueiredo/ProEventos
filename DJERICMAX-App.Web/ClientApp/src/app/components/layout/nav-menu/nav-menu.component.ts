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
  public infoAbout: string = "O EventPro é um sistema completo de gestão para produtoras musicais, DJs e bandas, oferecendo controle integrado de prospecção de clientes, serviços de entretenimento, equipamentos, propostas comerciais, contratos e financeiro. Desenvolvido para simplificar a organização de eventos desde o primeiro contato até o pós-evento, com relatórios detalhados e controle de pagamentos.";

  public infoDados: string = "Meus Dados";

  // Controle de modais
  public modalAberta: string = ''; // 'about', 'dados' ou vazio

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

  sair() {
    this.usuarioService.limpar_sessao();
    this.router.navigate(['/']);
  }

  abrirModal(tipo: string) {
    this.modalAberta = tipo;
  }

  fecharModal() {
    this.modalAberta = '';
  }
}
