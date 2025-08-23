import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-excluir-servico',
  templateUrl: './excluir-servico.component.html',
  styleUrls: ['./excluir-servico.component.css']
})
export class ExcluirServicoComponent implements OnInit {
  @Input() servico: Servico;
  @Input() index: number;
  @Input() servicos: Servico[];
  @Output() servicoExcluido = new EventEmitter<number>(); // Novo Output
  
  constructor() {}

  ngOnInit() {}

public excluirServico() {
    if (this.servicos && this.index !== undefined) {
      this.servicos.splice(this.index, 1);
      localStorage.setItem('servicosContratados', JSON.stringify(this.servicos));
      this.servicoExcluido.emit(this.index); // Emite o evento
    }
  }

}
