import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService implements OnInit {

private _baseUrl: string;
    public evento: Evento[];

    get headers(): HttpHeaders {
      return new HttpHeaders().set('content-type', 'application/json');
    }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

ngOnInit(): void {
    this.evento = [];
  }

   public cadastrar(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this._baseUrl}api/evento/cadastrar`,
      JSON.stringify(evento),{ headers: this.headers});
  }

  public pagar(eventoId: number, parcelaId: number): Observable<any> {
    return this.http.put<any>(
      `${this._baseUrl}api/evento/${eventoId}/parcelas/${parcelaId}/pagar`,
      {}, // corpo vazio, já que só altera o "Pago"
      { headers: this.headers }
    );
  }

  public salvar(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this._baseUrl}api/evento/salvar`,
      JSON.stringify(evento),{ headers: this.headers});
  }

  public deletar(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this._baseUrl}api/evento/deletar`,
      JSON.stringify(evento),{ headers: this.headers});
  }

  public obterTodosEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this._baseUrl}api/evento`);
  }

  public obterEvento(eventoid: number): Observable<Evento> {
    return this.http.get<Evento>(`${this._baseUrl}api/evento/id`);
  }


}
