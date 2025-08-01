import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
public usuario: Usuario;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {
      this.usuario = new Usuario();
    }

//   ngOnInit(): void {
//     this.usuario = sessionStorage.getItem("usuario-autenticado");
//     this.cdr.detectChanges();
//     }

//   ngAfterViewInit(): void {
//     this.usuario = sessionStorage.getItem("usuario-autenticado");
//     this.cdr.detectChanges();
//   }

//   collapse() {
//     this.isExpanded = false;
//   }

//   toggle() {
//     this.isExpanded = !this.isExpanded;
//   }

  public usuarioLogado(): boolean{
    return this.usuarioService.usuario_autenticado();

  }

//   sair(){
//     this.usuarioService.limpar_sessao();
//     this.router.navigate(['/']);
//   }


// }



  ngOnInit(): void {
    const usuarioJson = sessionStorage.getItem("usuario-autenticado");
    if (usuarioJson) {
      this.usuario = JSON.parse(usuarioJson);
    }
    this.cdr.detectChanges();
  }



  sair() {
    this.usuarioService.limpar_sessao();
    this.router.navigate(['/']);
  }
}
