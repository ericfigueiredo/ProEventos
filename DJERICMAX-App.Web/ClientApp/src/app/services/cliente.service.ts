import { Inject, Injectable, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements OnInit {

  private _baseUrl: string;
  public cliente: Cliente[];

    get headers(): HttpHeaders {
      return new HttpHeaders().set('content-type', 'application/json');
    }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

   ngOnInit(): void {
    this.cliente = [];
  }

  public cadastrarCliente(cliente: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>(`${this._baseUrl}api/cliente`,
        JSON.stringify(cliente), { headers: this.headers });
    }

  public salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`
      ${this._baseUrl}api/cliente/salvar`,
      JSON.stringify(cliente),
      { headers: this.headers});
  }

  public deletar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`
      ${this._baseUrl}api/cliente/deletar`,
      JSON.stringify(cliente),
      { headers: this.headers});
  }

  public obterTodosclientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this._baseUrl}api/cliente`);
  }

  public obterCliente(clienteid: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this._baseUrl}api/cliente/id`);
  }
}
