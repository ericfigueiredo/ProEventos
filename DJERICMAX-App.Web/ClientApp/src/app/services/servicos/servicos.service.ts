import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Servicos } from "../../models/servicos";

@Injectable({
  providedIn: 'root'
})
export class ServicosService implements OnInit {

  private _baseUrl: string;
  public servicos: Servicos[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.servicos = [];
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public cadastrar(servicos: Servicos): Observable<Servicos> {

    return this.http.post<Servicos>(`
      ${this._baseUrl}api/servicos/cadastrar`,
      JSON.stringify(servicos),
      { headers: this.headers});
  }

  public salvar(servicos: Servicos): Observable<Servicos> {

    return this.http.post<Servicos>(`
      ${this._baseUrl}api/servicos/salvar`,
      JSON.stringify(servicos),
      { headers: this.headers});
  }

  public deletar(servicos: Servicos): Observable<Servicos> {

    return this.http.post<Servicos>(`
      ${this._baseUrl}api/servicos/deletar`,
      JSON.stringify(servicos),
      { headers: this.headers});
  }

  public obterTodosServicos(): Observable<Servicos[]> {

    return this.http.get<Servicos[]>(`${this._baseUrl}api/servicos`);
  }

  public obterServico(servicoid: number): Observable<Servicos> {

    return this.http.get<Servicos>(`${this._baseUrl}api/servicos/id`);
  }
}
