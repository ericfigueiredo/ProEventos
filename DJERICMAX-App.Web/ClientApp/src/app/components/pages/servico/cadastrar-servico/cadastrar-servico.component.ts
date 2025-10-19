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
  public imagemPreview: string | ArrayBuffer | null = null;
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

   public inputChange(event: any) {
    const files = event.target.files;
    this.arquivoSelecionado = files.item(0);

    if (this.arquivoSelecionado) {
      // Verifica se é uma imagem
      if (!this.arquivoSelecionado.type.match('image.*')) {
        alert('Por favor, selecione apenas imagens!');
        this.limparImagem();
        return;
      }
      // Cria o preview da imagem
      this.criarPreviewImagem(this.arquivoSelecionado);
      // Faz o upload do arquivo
      this.ativar_spinner = true;
      this.servicoService.enviarArquivo(this.arquivoSelecionado).subscribe(
        (nomeArquivo) => {
          this.servico.nomeArquivo = nomeArquivo;
          this.ativar_spinner = false;
        },
        (e) => {
          console.log(e);
          this.ativar_spinner = false;
          this.limparImagem();
        }
      );
    }
  }

  private criarPreviewImagem(arquivo: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagemPreview = e.target.result;
    };
    reader.readAsDataURL(arquivo);
  }

  public removerImagem(): void {
    this.limparImagem();

    // Limpa o nome do arquivo no usuário se existir
    if (this.servico.nomeArquivo) {
      this.servico.nomeArquivo = null;
    }
  }

  private limparImagem(): void {
    this.imagemPreview = null;
    this.arquivoSelecionado = null;

    // Limpa o input file
    const inputFile = document.getElementById('inputFile') as HTMLInputElement;
    if (inputFile) {
      inputFile.value = '';
    }
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
