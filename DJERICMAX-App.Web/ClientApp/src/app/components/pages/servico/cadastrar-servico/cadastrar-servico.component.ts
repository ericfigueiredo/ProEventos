import { Servico } from 'src/app/models/servico';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicoService } from 'src/app/services/servico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.component.html',
  styleUrls: ['./cadastrar-servico.component.scss']
})
export class CadastrarServicoComponent implements OnInit {
  public servico: Servico;
  public arquivoSelecionado: File;
  public ativar_spinner: boolean;
  public mensagem:string;
  public servicoCadastrado: boolean;
  public usuarioCadastrado: boolean;
  @Output() fecharModal = new EventEmitter<void>();
  @Input() info: string;
  @Input() tipo: string;
  @Input() tab: string;

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

   fechar() {
    this.fecharModal.emit();
  }

  public inputChange(files: FileList) {
    this.arquivoSelecionado = files.item(0);
    this.ativarEspera();
    this.servicoService.enviarArquivo(this.arquivoSelecionado).subscribe(
      res => {
        this.servico.nomeArquivo = res.nomeArquivo;
        console.log(res.nomeArquivo);
        this.desativarEspera();
      },
      e => console.error(e)
    );
  }

  public cadastrarServico(){
    this.ativarEspera();
    this.servicoService.cadastrar(this.servico)
      .subscribe(
        servicoJson =>{
          console.log(servicoJson);
          this.mensagem = "";
          this.desativarEspera()
          this.fechar();
          sessionStorage.removeItem('servicoSession');
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.desativarEspera()
          this.fechar();
        }

      );
  }

  public cancelar(){
    sessionStorage.removeItem('servicoSession');
    this.fechar();
  }

  public ativarEspera(){
    this.ativar_spinner = true;
  }
  public desativarEspera(){
    this.ativar_spinner = false;
  }

}
