import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-loja-efetivar-compra',
  templateUrl: './loja-efetivar-compra.component.html',
  styleUrls: ['./loja-efetivar-compra.component.scss']
})
export class LojaEfetivarCompraComponent implements OnInit {
  public servicos: Servico[] = [];
  public servicosStorage;
  public totalCarrinho: number;
  public totalGeral: number;
  public frete: number = 50;

  servicoParaExcluir: any;
  indexParaExcluir: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.carregarServicosLocalStorage();
    this.atualizarTotal();
    this.atualizarTotalGeral();
  }

  abrirModal(servico, index) {
    this.servicoParaExcluir = servico;
    this.indexParaExcluir = index;
  }

  private carregarServicosLocalStorage() {
    this.servicosStorage = localStorage.getItem('servicosContratados');
    if (this.servicosStorage) {
      try {
        this.servicos = JSON.parse(this.servicosStorage);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
        this.servicos = [];
      }
    }
    this.atualizarTotais(); // Atualiza totais após carregar os serviços
  }

  public editarServico(servico: Servico, clique: string, index: number) {
    localStorage.setItem('clique', JSON.stringify(clique));
    localStorage.setItem('servicoIndex', index.toString());
    this.router.navigate(['/detalhe-servico']);
  }

  // ADICIONE ESTE MÉTODO PARA LIMPAR O CARRINHO
  public limparCarrinho() {
    this.servicos = []; // Limpa o array local
    localStorage.setItem('servicosContratados', JSON.stringify(this.servicos));
    this.atualizarTotais(); // Atualiza os totais após limpar
  }

  // MÉTODO PARA ATUALIZAR AMBOS OS TOTAIS
  public atualizarTotais() {
    this.atualizarTotal();
    this.atualizarTotalGeral();
  }

  public atualizarTotal(){
    this.totalCarrinho = this.servicos.reduce((acc, servico) => acc + servico.precoTotal, 0);
  }

  public atualizarTotalGeral(){
    this.totalGeral = this.totalCarrinho + this.frete;
  }

  // MÉTODO PARA EXCLUIR UM SERVIÇO ESPECÍFICO (se necessário)
  public excluirServico(index: number) {
    this.servicos.splice(index, 1);
    localStorage.setItem('servicosContratados', JSON.stringify(this.servicos));
    this.atualizarTotais(); // Atualiza os totais após excluir
  }
  
}