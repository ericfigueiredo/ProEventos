import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from 'src/app/services/servico.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pesquisa-servico',
  templateUrl: './pesquisa-servico.component.html',
  styleUrls: ['./pesquisa-servico.component.css']
})
export class PesquisaServicoComponent implements OnInit {

  public servicos: Servico[];

  constructor(private servicoService: ServicoService,
              private router: Router,
            private currencyPipe: CurrencyPipe  ) {
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

  public deletarServico(servico: Servico){
    var retorno = confirm("Deseja deletar este pacote de serviços?");
    if (retorno == true) {
      this.servicoService.deletar(servico).subscribe(
        servico => {
          this.servicos = servico;
        }, e => {
          console.log(e.erros);
        }
      )
    }
  }

  public editarServico(servico: Servico){
    sessionStorage.setItem('servicoSession', JSON.stringify(servico));
    this.router.navigate(['/cadastrar-servico']);
  }
}
