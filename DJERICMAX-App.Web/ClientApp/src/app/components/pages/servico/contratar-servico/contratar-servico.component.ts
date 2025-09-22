import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-contratar-servico',
  templateUrl: './contratar-servico.component.html',
  styleUrls: ['./contratar-servico.component.scss']
})
export class ContratarServicoComponent implements OnInit {
  public servicos: Servico[] = [];
  public servicosStorage;
  public totalCarrinho: number;
  public totalGeral: number;
  public frete: number = 50;
  public modalAberta: string = "";

  public info: string;
  public msg: string;
  servicoParaExcluir: any;
  indexParaExcluir: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.carregarServicosLocalStorage();
    this.atualizarTotal();
    this.atualizarTotalGeral();
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
    sessionStorage.setItem('clique', JSON.stringify(clique));
    localStorage.setItem('servicoIndex', index.toString());
    this.router.navigate(['/detalhe-servico']);
  }

  public atualizarTotal(){
    this.totalCarrinho = this.servicos.reduce((acc, servico) => acc + servico.precoTotal, 0);
  }

  public atualizarTotalGeral(){
    this.totalGeral = this.totalCarrinho + this.frete;
  }

  // MÉTODO PARA ATUALIZAR AMBOS OS TOTAIS
  public atualizarTotais() {
    this.atualizarTotal();
    this.atualizarTotalGeral();
    this.fecharModal();
  }

  // ADICIONE ESTE MÉTODO PARA LIMPAR O CARRINHO
  public limparCarrinho() {
    this.servicos = [];
    localStorage.setItem('servicosContratados', JSON.stringify(this.servicos));
    this.atualizarTotais();
  }

  // MÉTODO PARA EXCLUIR UM SERVIÇO ESPECÍFICO (se necessário)
  public excluirServico(index: number) {
    this.servicos.splice(index, 1);
    localStorage.setItem('servicosContratados', JSON.stringify(this.servicos));
    this.atualizarTotais();
    this.fecharModal();

  }

  abrirModal(servico: Servico, tipo: string, clique: string, index: number) {
      if (tipo == 'excluirServico') {
        this.servicoParaExcluir = servico;
        this.indexParaExcluir = index;
        this.info = "Excluir Serviço";
        this.msg = `
        Deseja excluir o serviço <b>${this.servicoParaExcluir.nome}</b> com
        <b>${this.servicoParaExcluir.quantidade}</b> horas de serviço?`;
      } else
      if (tipo == 'limparCarrinho') {
        this.servicoParaExcluir = servico;
        this.info = "Limpar Carrinho";
        this.msg = `Tem certeza que deseja excluir <b>Todos</b> os serviços do carrinho?`;
      }
      sessionStorage.setItem("clique", JSON.stringify(clique));
      this.modalAberta = tipo;
    }

    fecharModal() {
      this.modalAberta = "";
    }


}
