import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = true;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
              private router: Router,
              private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
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





public menuSideBar = [
  {id: 1, name: 'Dashboard', route: '/dashboard', icon: 'home_app_logo'},
  {id: 2, name: 'Prospecção', route: '/pesquisar-prospeccao', icon: 'person_search'},
  {id: 3, name: 'Clientes', route: '/pesquisar-cliente', icon: 'groups_3'},
  {id: 4, name: 'Contratos', route: '/contrato', icon: 'clear_all'},
  {id: 5, name: 'Eventos', route: '/evento', icon: 'nightlife'},
  {id: 6, name: 'Pós-Eventos', route: '/pos-evento', icon: 'event_available'},
  {id: 7, name: 'Relatórios', route: '/relatorio', icon: 'task'},
  {id: 8, name: 'Serviços', route: '/pesquisar-servico', icon: 'manage_search'},
  {id: 9, name: 'Carrinho', route: '/efetivar-compra', icon: 'shopping_cart'},
  {id: 10, name: 'Vincular Serviço', route: '/vincular-servico', icon: 'shopping_cart'}
]


}
