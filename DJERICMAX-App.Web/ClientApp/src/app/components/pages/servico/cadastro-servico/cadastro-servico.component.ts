import { Servico } from 'src/app/models/servico';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/services/servico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrls: ['./cadastro-servico.component.css']
})
export class CadastroServicoComponent implements OnInit {

  public servico: Servico;
  public arquivoSelecionado: File;
  public ativar_spinner: boolean;
  public mensagem:string;

  constructor(private servicoService: ServicoService,
              private router: Router  ) { }

  ngOnInit() {
    var servicoSession = sessionStorage.getItem('servicoSession');
    if (servicoSession) {
      this.servico = JSON.parse(servicoSession);
    } else {
      this.servico = new Servico();
    }
  }

  public inputChange(files: FileList) {
    this.arquivoSelecionado = files.item(0);
    this.ativar_spinner = true;
    this.servicoService.enviarArquivo(this.arquivoSelecionado)
    .subscribe(
      nomeArquivo => {
        this.servico.nomeArquivo = nomeArquivo;
        console.log(nomeArquivo);
        this.ativar_spinner = false;
      },
      e => {
        console.log(e);
      }
    );
  }

  public cadastrar(){
    this.ativarEspera();
    this.servicoService.cadastrar(this.servico)
      .subscribe(
        servicoJson =>{
          console.log(servicoJson);
          this.mensagem = "";
          this.desativarEspera()
          this.router.navigate(['/Pesquisar-servico']);
          sessionStorage.removeItem('servicoSession');
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.desativarEspera()
        }

      );
  }

  public cancelar(){
    sessionStorage.removeItem('servicoSession');
    this.router.navigate(['/Pesquisar-servico']);
  }

  public ativarEspera(){
    this.ativar_spinner = true;
  }
  public desativarEspera(){
    this.ativar_spinner = false;
  }

}
