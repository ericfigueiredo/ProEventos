import { Component, OnInit } from "@angular/core";
import { Prospeccao } from "src/app/models/prospeccao";
import { ProspeccaoService } from "src/app/services/prospeccao.service";

@Component({
  selector: "app-prospeccao",
  templateUrl: "./prospeccao.component.html",
  styleUrls: ["./prospeccao.component.css"],
})
export class ProspeccaoComponent implements OnInit {
  public pacotes = [
    { id: 1, nome: "Pacote New", categoria: "Eventos Noturnos" },
    { id: 2, nome: "Pacote Elegance", categoria: "Eventos Noturnos" },
    { id: 3, nome: "Pacote Premium", categoria: "Eventos Noturnos" },
    { id: 4, nome: "Locação Iluminação", categoria: "Eventos Noturnos" },
    { id: 5, nome: "Locação Telão e Datashow", categoria: "Eventos Noturnos" },
    { id: 6, nome: "Pacote AUDIANCE", categoria: "Eventos Diurnos" },
    { id: 7, nome: "Cobertura de Cerimônia", categoria: "Eventos Diurnos" },
  ];

  public categorias = Array.from(new Set(this.pacotes.map((p) => p.categoria)));

  public pacotesPorCategoria(categoria: string) {
    return this.pacotes.filter((p) => p.categoria === categoria);
  }

  public prospeccao: Prospeccao;
  constructor(private prospeccaoService: ProspeccaoService) {}

  ngOnInit() {
    this.prospeccao = new Prospeccao();
  }

  public cadastrar() {
    this.prospeccaoService.cadastrar(this.prospeccao).subscribe(
      (prospeccaoJson) => {
        console.log(prospeccaoJson);
      },
      (e) => {
        console.log(e.error);
      }
    );
  }
}
