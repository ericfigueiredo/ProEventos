import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-carrinho-servico',
  templateUrl: './carrinho-servico.component.html',
  styleUrls: ['./carrinho-servico.component.scss']
})
export class CarrinhoServicoComponent implements OnInit {
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
    } else {
      return this.servicos;
    }
  }

  public removerServicoCarrinho(servico: Servico) {

  }

  public temItensCarrinho(): boolean {
    var itens = this.obterServicosCarrinho();
    return (itens.length > 0);
  }

  public quantidadeItensCarrinho(): number {
    var itens = this.obterServicosCarrinho();
    return (itens.length);
  }

}
