import { Component, OnInit } from "@angular/core";
import { T } from "@angular/core/src/render3";
import { Router } from "@angular/router";
import { Servico } from "src/app/models/servico";
import { ServicoService } from "src/app/services/servico.service";

@Component({
  selector: "app-loja-pesquisa",
  templateUrl: "./loja-pesquisa.component.html",
  styleUrls: ["./loja-pesquisa.component.scss"],
})
export class LojaPesquisaComponent implements OnInit {

  public servicos: Servico[];
  public textoFormatado: string;

  constructor(private servicoService: ServicoService, private router: Router) {
    this.servicoService.obterTodosServico()
    .subscribe(
      servicos => {
        this.servicos = servicos;
      },
      e => {

      }
    );
  }

  ngOnInit() {
    for (let i = 0; i < this.servicos.length; i++) {
      this.servicos[i].descricao = this.servicos[i].descricao.replace(/([:.])\s*/g,"$1<br>");
      console.log(this.servicos);
    }
  }

  public detalheServico(servico: Servico, clique: string){
    localStorage.setItem('clique', JSON.stringify(clique));
    sessionStorage.setItem('servicoDetalhe', JSON.stringify(servico));
    this.router.navigate(['/detalhe-servico']);
  }
}
