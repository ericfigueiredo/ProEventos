import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-conta-contratos',
  templateUrl: './conta-contratos.component.html',
  styleUrls: ['./conta-contratos.component.css']
})
export class ContaContratosComponent implements OnInit {
  public eventos: Evento[] = [];
  public totalGeral: number = 0;
  public totalAtual: number = 0; /* últimos 3 meses */

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit() {
    this.contaARealizar();
  }

  contaARealizar(){
    this.eventoService.obterTodosEventos().subscribe(
        (eventos) => {
          this.eventos = eventos;
          this.totalGeral = eventos.length;
          this.totalAtual = eventos.filter(e => !e.realizado).length;

          console.log('Atual: ' + this.totalAtual + ', geral: ' + this.totalGeral)
        },
        (e) => {
          console.error(e);
        }
      );
  }

}
