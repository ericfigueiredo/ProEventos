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

  sair(){
    this.usuarioService.limpar_sessao();
    this.router.navigate(['/']);
  }

}
