import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from 'src/app/services/servico.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lista-servico',
  templateUrl: './lista-servico.component.html',
  styleUrls: ['./lista-servico.component.scss']
})
export class ListaServicoComponent implements OnInit {
  public servicos: Servico[];
  public modalAberta: string = "";
  public info: string;
  public tipo: string;
  public msg: string;
  servicoParaExcluir: any;
  indexParaExcluir: number;

  constructor(
    private servicoService: ServicoService,
    private router: Router,
    private currencyPipe: CurrencyPipe
  ) {
    this.servicoService.obterTodosServico()
    .subscribe(
      servicos => {
        console.log(servicos);
        this.servicos = servicos;
      },
      e => {

      }
    )
  }

  ngOnInit() {
  }

  formatarValor(valor: number): string {
    return this.currencyPipe.transform(valor, 'BRL', 'symbol', '1.2-2', 'pt-BR');
  }

  public adicionarServico(){
     this.router.navigate(['/cadastrar-servico']);
  }

  public excluirServico(servico: Servico){
      this.servicoService.deletar(servico).subscribe({
      next: () => {
        this.servicos = this.servicos.filter((s) => s.id !== servico.id);
      },
      error: (e) => {
        console.error("Erro ao deletar servico:", e);
        alert("Erro ao deletar servico. Verifique o console.");
      },
    });
    this.fecharModal();
  }

  public editarServico(servico: Servico){
    sessionStorage.setItem('servicoSession', JSON.stringify(servico));
    this.router.navigate(['/cadastrar-servico']);
  }

  abrirModal(servico: Servico, tipo: string, clique: string, index: number) {
      if (tipo == "add") {
        sessionStorage.removeItem("servicoSession");
        this.info = "Cadastrar Serviço";
        this.modalAberta = clique;
      } else if (tipo == "edit") {
        sessionStorage.setItem("servicoSession", JSON.stringify(servico));
        this.info = "Editar Serviço";
        this.modalAberta = clique;
      } else if (tipo == "excluirServico") {
        this.servicoParaExcluir = servico;
        this.indexParaExcluir = index;
        this.info = "Excluir Servico";
        this.msg = `
              Deseja excluir o Serviço <b>${this.servicoParaExcluir.nome}?`;
        this.modalAberta = tipo;
      }

      sessionStorage.setItem("clique", JSON.stringify(clique));
    }

    fecharModal() {
      this.modalAberta = "";
    }
}
