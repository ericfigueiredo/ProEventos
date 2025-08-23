import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-limpar-carrinho',
  templateUrl: './limpar-carrinho.component.html',
  styleUrls: ['./limpar-carrinho.component.css']
})
export class LimparCarrinhoComponent implements OnInit {
  @Output() carrinhoLimpo = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public limparCarrinho() {
    localStorage.removeItem('servicosContratados');
    this.carrinhoLimpo.emit(); // Emite evento para o componente pai
  }

}
