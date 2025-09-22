import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import { CarrinhoServicoComponent } from '../../pages/servico/carrinho-servico/carrinho-servico.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = true;
  public carrinhoCompras: CarrinhoServicoComponent;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
              private router: Router,
              private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
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

  public usuarioLogado(): boolean{
    return this.usuarioService.usuario_autenticado();
  }

  public usuario_administrador(): boolean{
    return this.usuarioService.usuario_administrador();
  }

  public temItensCarrinho(): boolean {
    return this.carrinhoCompras.temItensCarrinho();
  }

  public quantidadeItensCarrinho(): number {
    return this.carrinhoCompras.quantidadeItensCarrinho();
  }



public menuSideBar = [
  {id: 1, usAdm:false, name: 'Início', route: '/', icon: 'home_app_logo', badge: null},
  {id: 2, usAdm:false, name: 'Prospecção', route: '/pesquisar-prospeccao', icon: 'person_search', badge: null},
  {id: 3, usAdm:false, name: 'Clientes', route: '/pesquisar-cliente', icon: 'groups_3', badge: null},
  {id: 4, usAdm:false, name: 'Contratos', route: '/contrato', icon: 'clear_all', badge: null},
  {id: 5, usAdm:false, name: 'Eventos', route: '/listar-evento', icon: 'nightlife', badge: null},
  {id: 6, usAdm:false, name: 'Realizados', route: '/realizado', icon: 'event_available', badge: null},
  {id: 7, usAdm:false, name: 'Serviços', route: '/listar-servico', icon: 'manage_search', badge: null},
  {id: 8, usAdm:true, name: 'Relatórios', route: '/relatorio', icon: 'task', badge: null},
  {id: 9, usAdm:false, name: 'Carrinho', route: '/contratar-serviço', icon: 'shopping_cart', badge: () => this.quantidadeItensCarrinho()},
  {id: 10, usAdm:false, name: 'Vincular Serviço', route: '/pesquisar-servico', icon: 'shopping_cart', badge: null}
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

}
