
/*
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

*/




import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: 'app-limpar-carrinho',
  templateUrl: './limpar-carrinho.component.html',
  styleUrls: ['./limpar-carrinho.component.css']
})
export class LimparCarrinhoComponent implements OnInit {

  @Input() info: string;
  @Input() msg: string;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onConfirmar() {
    this.confirmar.emit();
  }

  onCancelar() {
    this.cancelar.emit();
  }
}


