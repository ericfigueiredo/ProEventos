import { Component } from '@angular/core';
import { UsuarioService } from '../app/services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isSidebarCollapsed = false;

  constructor(private usuarioService: UsuarioService) { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  usuarioLogado(): boolean {
    return this.usuarioService.usuario_autenticado();
  }

}
