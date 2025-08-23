import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-loja-carrinho-compras',
  templateUrl: './loja-carrinho-compras.component.html',
  styleUrls: ['./loja-carrinho-compras.component.scss']
})
export class LojaCarrinhoComprasComponent implements OnInit {
  public servicos: Servico[] = [];
  constructor() { }

  ngOnInit() {
  }

  public adicionar(servico: Servico){
    var servicosContratados = localStorage.getItem("servicosContratados");
    if (servicosContratados) {
      this.servicos = JSON.parse(servicosContratados);
    }
    this.servicos.push(servico);
    localStorage.setItem("servicosContratados", JSON.stringify(this.servicos));
  }

  public obterServicosCarrinho() : Servico[] {
    var servicosContratados = localStorage.getItem("servicosContratados");
    if (servicosContratados) {
      return JSON.parse(servicosContratados);
    }
  }

  public removerServicoCarrinho(servico: Servico) {

  }

}
