import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Servico } from "../models/servico";

@Injectable({
  providedIn: "root",
})
export class ServicoService {
  private _baseUrl: string;
  public servico: Servico[] = [];

  get headers(): HttpHeaders {
    return new HttpHeaders().set("content-type", "application/json");
  }

  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public cadastrar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`${this._baseUrl}api/servico`,
      JSON.stringify(servico), { headers: this.headers });
  }

  public salvar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`${this._baseUrl}api/servico/salvar`,
      JSON.stringify(servico), { headers: this.headers });
  }

  public obterTodosServico(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this._baseUrl}api/servico`);
  }

  public obterServico(servicoid: number): Observable<Servico> {
    // corrige a url para incluir o id
    return this.http.get<Servico>(`${this._baseUrl}api/servico/${servicoid}`);
  }

  public enviarArquivo(arquivoSelecionado: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
    // endpoint do controller -> EnviarArquivoTemporario
    return this.http.post<string>(`${this._baseUrl}api/servico/EnviarArquivoTemporario`, formData);
  }

  public deletar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`${this._baseUrl}api/servico/deletar`,
      JSON.stringify(servico), { headers: this.headers });
  }

  public deletarArquivo(nomeArquivo: string): Observable<string> {
    // corresponde ao controller: [HttpDelete("RemoverArquivo/{nomeArquivo}")]
    return this.http.delete(`${this._baseUrl}api/servico/RemoverArquivo/${nomeArquivo}`,
      { responseType: "text" });
  }

  confirmarImagem(dados: any): Observable<any> {
    console.log('Enviando confirmarImagem:', dados);
    return this.http.post(`${this._baseUrl}api/servico/ConfirmarImagem`, dados, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // cancela imagem temporária (apaga o arquivo temp)
  public cancelarImagem(nomeArquivo: string): Observable<string> {
    // controller: [HttpPost("CancelarImagem")]
    return this.http.post<string>(`${this._baseUrl}api/servico/CancelarImagem`,
      JSON.stringify(nomeArquivo), { headers: this.headers, responseType: 'text' as 'json' });
  }
}
