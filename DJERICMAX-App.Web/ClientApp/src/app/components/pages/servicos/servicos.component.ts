import { Component } from "@angular/core";

@Component({
  selector : "app-servicos",
  template : "<html><body>{{ obterNome() }}</body></html>" 
})

export class ServicosComponent {  // Nome das classes por convenção PascalCase
  /* camelCase para variáveis, atributos e nomes de funções*/

  public nome: string;
  public sevicoAtivo: boolean;

  public obterNome(): string {
    return "Pacote PREMIUM";
  }
}
