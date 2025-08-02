import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/models/usuario';
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string;
  private _usuario: Usuario;
  private _usuarioSubject = new BehaviorSubject<Usuario>(null);
  public usuario$ = this._usuarioSubject.asObservable();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

    const usuarioJson  = sessionStorage.getItem('usuario-autenticado');
    if (usuarioJson ) {
      // this.usuario = JSON.parse(usuarioJson );
      this._usuarioSubject.next(JSON.parse(usuarioJson));
    }
  }

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    // this._usuario = usuario;
    this._usuarioSubject.next(usuario); // Notifica todos os inscritos

  }

  get usuario(): Usuario {
    // let usuario_json = sessionStorage.getItem("usuario-autenticado");
    // this._usuario = JSON.parse(usuario_json);
    // return this._usuario;
    return this._usuarioSubject.value;

  }

  public usuario_autenticado(): boolean {
    const u = this._usuarioSubject.value;
    return u != null && u.email !== "" && u.senha !== "";

    // return  this._usuario != null && this._usuario.email != "" &&
    //         this._usuario.senha != "";
  }

  public limpar_sessao(){
    sessionStorage.removeItem("usuario-autenticado");
    this._usuarioSubject.next(null);

    // sessionStorage.setItem("usuario-autenticado", "");
    // this._usuario = null;
  }


  // public verificaUsuario(usuario: Usuario): Observable<Usuario>{
  public verificaUsuario(usuario: Usuario): Observable<Usuario>{
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      email: usuario.email,
      senha: usuario.senha
    }
    // this.baseUrl = raiz do site da api
    return this.http.post<Usuario>(`${this.baseUrl}api/usuario/verificarUsuario`, body, { headers });
  }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      email         :   usuario.email,
      senha         :   usuario.senha,
      nome          :   usuario.nome,
      sobreNome     :   usuario.sobreNome,
      cpf           :   usuario.cpf,
      rg            :   usuario.rg,
      fotoUrl       :   usuario.fotoUrl
    }

    return this.http.post<Usuario>(`${this.baseUrl}api/usuario`, body, { headers });
  }



}
