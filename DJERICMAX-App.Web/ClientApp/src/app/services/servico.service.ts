import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Servico } from '../models/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService implements OnInit {

  private _baseUrl: string;
  public servico: Servico[];

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.servico = [];
  }

  public cadastrar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`${this._baseUrl}api/servico`,
      JSON.stringify(servico), { headers: this.headers});
  }

  public salvar(servico: Servico): Observable<Servico> {

    return this.http.post<Servico>(`
      ${this._baseUrl}api/servico/salvar`,
      JSON.stringify(servico),
      { headers: this.headers});
  }

  public deletar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`
      ${this._baseUrl}api/servico/deletar`,
      JSON.stringify(servico),
      { headers: this.headers});
  }

  public obterTodosServico(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this._baseUrl}api/servico`);
  }

  public obterServico(servicoid: number): Observable<Servico> {

    return this.http.get<Servico>(`${this._baseUrl}api/servico/id`);
  }

  public enviarArquivo(arquivoSelecionado: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
    return this.http.post<string>(`${this._baseUrl}api/servico/enviarArquivo`, formData);
}


}
