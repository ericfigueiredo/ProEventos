import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CarrinhoServicoComponent } from '../../pages/servico/carrinho-servico/carrinho-servico.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = true;
  public carrinhoCompras: CarrinhoServicoComponent;

  public usuario: Usuario = new Usuario();
  private subscription!: Subscription;

  public info: string = "";
  public modalAberta: string = "";
  public cadastroAberto: boolean = false; // <- controle da modal de cadastro

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
             private usuarioService: UsuarioService,
             private router: Router
            ) { }

  ngOnInit() {

    this.subscription = this.usuarioService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });

    this.carrinhoCompras = new CarrinhoServicoComponent();
    // Detecta resolução 1080x1920 e inicia fechada
    if (window.innerWidth <= 767 && window.innerHeight <= 866) {
      this.isCollapsed = true;
    } else if (window.innerWidth === 1080 && window.innerHeight <= 1920) {
      this.isCollapsed = true;
    } else {
       this.isCollapsed = false;
    }
   }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

  // public usuarioLogado(): boolean{
  //   return this.usuarioService.usuario_autenticado();
  // }

  // public usuario_administrador(): boolean{
  //   return this.usuarioService.usuario_administrador();
  // }

  public temItensCarrinho(): boolean {
    return this.carrinhoCompras.temItensCarrinho();
  }

  public quantidadeItensCarrinho(): number {
    return this.carrinhoCompras.quantidadeItensCarrinho();
  }



public menuSideBar = [
  {id: 1,    usAdm:false,  name: 'Início',            route: '/',                     color: '#35C7F8',   icon: 'house',                  badge: null},
  {id: 2,    usAdm:false,  name: 'Prospecção',        route: '/pesquisar-prospeccao', color: '#FF2F88',   icon: 'laptop-file',            badge: null},
  {id: 3,    usAdm:false,  name: 'Clientes',          route: '/pesquisar-cliente',    color: '#FF4000',   icon: 'users',                  badge: null},
  {id: 4,    usAdm:false,  name: 'Contratos',         route: '/contrato',             color: '#00CA32',   icon: 'file-contract',          badge: null},
  {id: 5,    usAdm:false,  name: 'Eventos',           route: '/listar-evento',        color: '#F10001',   icon: 'martini-glass-citrus',   badge: null},
  {id: 6,    usAdm:false,  name: 'Realizados',        route: '/realizado',            color: '#0190FF',   icon: 'calendar-check',         badge: null},
  {id: 7,    usAdm:false,  name: 'Serviços',          route: '/listar-servico',       color: '#00D7A8',   icon: 'gears',                  badge: null},
  {id: 8,    usAdm:true,   name: 'Relatórios',        route: '/relatorio',            color: '#FE28C2',   icon: 'square-poll-horizontal', badge: null},
  {id: 9,    usAdm:false,  name: 'Carrinho',          route: '/contratar-serviço',    color: '#FFAA01',   icon: 'dolly',                  badge: () => this.quantidadeItensCarrinho()},
  {id: 10,   usAdm:false,  name: 'Vincular Serviço',  route: '/pesquisar-servico',    color: '#66CFFF',   icon: 'folder-tree',          badge: null}
]

get menuFiltrado() {
  if (this.usuario_administrador()) {
    // Para admin: mostra tudo, exceto carrinho se não tiver itens
    return this.menuSideBar.filter(m =>
      m.id !== 9 || this.temItensCarrinho()
    );
  } else {
    // Para usuário comum: mostra apenas não-admin E verifica carrinho
    return this.menuSideBar.filter(m =>
      !m.usAdm && (m.id !== 9 || this.temItensCarrinho())
    );
  }
}

ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  usuarioLogado(): boolean {
    return this.usuarioService.usuario_autenticado();
  }

  usuario_administrador(): boolean {
    return this.usuarioService.usuario_administrador();
  }

  sair() {
    this.usuarioService.limpar_sessao();
    this.router.navigate(['/entrar']);
  }

  abrirModal(tipo: string) {
    if (tipo === 'about') this.info = 'Sobre o sistema';
    if (tipo === 'dados') this.info = 'Meu Perfil';
    if (tipo === 'novoUsuario') this.info = 'Cadastrar Novo Usuário';
    if (tipo === 'listarUsuarios') this.info = 'Usuários do Sistema';

    this.modalAberta = tipo;
  }

  fecharModal() {
    this.modalAberta = '';
    this.cadastroAberto = false; // fecha também a de cadastro se estiver aberta
  }

  abrirCadastroUsuario() {
    this.cadastroAberto = true;
  }

  fecharCadastroUsuario() {
    this.cadastroAberto = false;
    // Aqui podemos emitir evento para recarregar lista de usuários
    if (this.modalAberta === 'listarUsuarios') {
      // você pode expor um Subject no listar-usuarios p/ atualizar
    }
  }

   onCancelar() {
    if (this.modalAberta === 'excluirUsuario') {
      // você pode expor um Subject no listar-usuarios p/ atualizar
    }
  }




}
