import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-conta-eventos',
  templateUrl: './conta-eventos.component.html',
  styleUrls: ['./conta-eventos.component.css']
})
export class ContaEventosComponent implements OnInit {
  public eventos: Evento[] = [];
  public totalGeral: number = 0;
  public totalAtual: number = 0; /* últimos 3 meses */

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit() {
    this.contaRealizados();
  }

  contaRealizados(){
    this.eventoService.obterTodosEventos().subscribe(
        (eventos) => {
          this.eventos = eventos;
          this.totalGeral = eventos.filter(e => e.realizado).length;
          const dataLimite = new Date();
          dataLimite.setMonth(dataLimite.getMonth() - 3);
          this.totalAtual = eventos.filter(e =>
            e.realizado && new Date(e.dataEvento) >= dataLimite).length;

      console.log('Atual: ' + this.totalAtual + ', geral: ' + this.totalGeral);
    },
    (e) => {
      console.error(e);
    }
  );
  }

}
