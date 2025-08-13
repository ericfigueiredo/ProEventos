import { Inject, Injectable, OnInit } from '@angular/core';
import { Prospeccao } from '../models/prospeccao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProspeccaoService implements OnInit {

  private _baseUrl: string;
    public prospeccao: Prospeccao[];

    get headers(): HttpHeaders {
      return new HttpHeaders().set('content-type', 'application/json');
    }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.prospeccao = [];
  }

 public cadastrar(prospeccao: Prospeccao): Observable<Prospeccao> {

    return this.http.post<Prospeccao>(`
      ${this._baseUrl}api/prospeccao/cadastrar`,
      JSON.stringify(prospeccao),
      { headers: this.headers});
  }

  public salvar(prospeccao: Prospeccao): Observable<Prospeccao> {

    return this.http.post<Prospeccao>(`
      ${this._baseUrl}api/prospeccao/salvar`,
      JSON.stringify(prospeccao),
      { headers: this.headers});
  }

  public deletar(prospeccao: Prospeccao): Observable<Prospeccao> {

    return this.http.post<Prospeccao>(`
      ${this._baseUrl}api/prospeccao/deletar`,
      JSON.stringify(prospeccao),
      { headers: this.headers});
  }

  public obterTodosprospeccao(): Observable<Prospeccao[]> {

    return this.http.get<Prospeccao[]>(`${this._baseUrl}api/prospeccao`);
  }

  public obterServico(servicoid: number): Observable<Prospeccao> {

    return this.http.get<Prospeccao>(`${this._baseUrl}api/prospeccao/id`);
  }

}
