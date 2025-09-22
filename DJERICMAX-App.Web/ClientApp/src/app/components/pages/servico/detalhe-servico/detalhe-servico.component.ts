// loja-detalhe-servico.component.ts
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Servico } from "src/app/models/servico";

@Component({
  selector: "app-detalhe-servico",
  templateUrl: "./detalhe-servico.component.html",
  styleUrls: ["./detalhe-servico.component.scss"],
})
export class DetalheServicoComponent implements OnInit {
  public servico: Servico;
  public quantidade: number = 1;
  public precoTotal: number = 0;
  public textoFormatado: string;
  public clique;
  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarServico();
  }

  private carregarServico() {
    this.clique = JSON.parse(sessionStorage.getItem("clique"));
    // sessionStorage.removeItem('clique');
    if (this.clique === "pesquisa") {
      this.carregarServicoPesquisa();
    } else if (this.clique === "efetivar") {
      this.carregarServicoEfetivar();
    }

    if (this.servico) {
      this.textoFormatado = this.servico.descricao.replace(
        /([:.])\s*/g,
        "$1<br>"
      );
      this.calcularPreco();
    }
  }

  private carregarServicoPesquisa() {
    const servicoDetalhe = sessionStorage.getItem("servicoDetalhe");
    if (servicoDetalhe) {
      try {
        this.servico = JSON.parse(servicoDetalhe);
      } catch (error) {
        console.error("Erro ao carregar serviço da pesquisa:", error);
      }
    }
  }

  private carregarServicoEfetivar() {
    const indexStr = localStorage.getItem("servicoIndex");
    const servicosStorage = localStorage.getItem("servicosContratados");

    if (indexStr && servicosStorage) {
      try {
        const index = parseInt(indexStr, 10);
        const servicosArray = JSON.parse(servicosStorage);

        if (index >= 0 && index < servicosArray.length) {
          this.servico = servicosArray[index];
          this.quantidade = this.servico.quantidade || 1;
        }
      } catch (error) {
        console.error("Erro ao carregar serviço para edição:", error);
      }
    }
  }

  public calcularPreco() {
    const qtd = Number(this.quantidade) || 0;
    this.precoTotal = qtd * Number(this.servico.preco_Hora);
  }

  public contratarServico() {
  const servicoContratado = {
    ...this.servico,
    quantidade: this.quantidade,
    precoTotal: this.precoTotal
  };
  let listaServicos = JSON.parse(localStorage.getItem("servicosContratados")) || [];
  this.clique = JSON.parse(sessionStorage.getItem('clique'));
  const indexStr = localStorage.getItem('servicoIndex');

  if (this.clique === 'contratar' && indexStr !== null) {
    const index = parseInt(indexStr, 10);
    if (index >= 0 && index < listaServicos.length) {
      listaServicos[index] = servicoContratado;
    } else {
      listaServicos.push(servicoContratado);
    }
    localStorage.setItem("servicosContratados", JSON.stringify(listaServicos));
    this.router.navigate(["/contratar-serviço"]);

  } else {
    listaServicos.push(servicoContratado);
    localStorage.setItem("servicosContratados", JSON.stringify(listaServicos));
    this.router.navigate(["/contratar-serviço"]);
  }
}

}
