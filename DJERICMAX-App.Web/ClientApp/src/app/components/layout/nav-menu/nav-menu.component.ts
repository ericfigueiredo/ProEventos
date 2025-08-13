import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public usuario: Usuario;
  private subscription: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.subscription = this.usuarioService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
    });

    // const usuarioJson = sessionStorage.getItem("usuario-autenticado");
    // if (usuarioJson) {
    //   this.usuario = JSON.parse(usuarioJson);
    // }
    // this.cdr.detectChanges();
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

}
