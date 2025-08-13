import { Component, OnInit } from "@angular/core";
import { Servico } from "src/app/models/servico";
import { ServicoService } from "src/app/services/servico.service";

@Component({
  selector: "app-loja-pesquisa",
  templateUrl: "./loja-pesquisa.component.html",
  styleUrls: ["./loja-pesquisa.component.css"],
})
export class LojaPesquisaComponent implements OnInit {

  public servicos: Servico[];

  constructor(private servicoService: ServicoService) {
    this.servicoService.obterTodosServico()
    .subscribe(
      servicos => {
        this.servicos = servicos;
      },
      e => {

      }
    );
  }

  ngOnInit() {}
}
