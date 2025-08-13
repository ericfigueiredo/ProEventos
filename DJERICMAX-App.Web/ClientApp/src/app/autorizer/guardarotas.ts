import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../services/usuario.service";

@Injectable({
  providedIn: 'root'
})

export class GuardaRotas implements CanActivate {

  constructor(private router: Router, private usuarioService: UsuarioService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.usuarioService.usuario_autenticado()) {
      return true;
    }

    this.router.navigate(['/entrar'], {queryParams:{ returnUrl: state.url}});
    return  false;
  }


}

