import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isCollapsed = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
              private router: Router,
              private usuarioService: UsuarioService
  ) { }

  ngOnInit() { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

  public usuarioLogado(): boolean{
    return this.usuarioService.usuario_autenticado();
  }

  sair(){
    this.usuarioService.limpar_sessao();
    this.router.navigate(['/']);
  }

}
