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
  public servico: Servico = new Servico();
  public arquivoSelecionado: File | null = null;
  public ativar_spinner = false;
  public mensagem = '';
  public imagemPreview: string | ArrayBuffer | null = null;

  private imagemAntiga: string | null = null;
  public imagemTemporaria: string | null = null;
  public imagemMarcadaParaExcluir = false;

  @Output() fecharModal = new EventEmitter<void>();
  @Input() info!: string;
  @Input() tipo!: string;
  @Input() tab!: string;

  constructor(private servicoService: ServicoService, private router: Router) { }

  ngOnInit() {
    const servicoSession = sessionStorage.getItem('servicoSession');
    if (servicoSession) {
      this.servico = JSON.parse(servicoSession);
      this.imagemAntiga = this.servico.nomeArquivo || null;
    }
  }

  fechar() {
    this.fecharModal.emit();
  }

  public inputChange(event: any) {
    const file = event.target.files.item(0);
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Selecione apenas imagens!');
      this.limparImagem();
      return;
    }

    this.arquivoSelecionado = file;
    this.criarPreviewImagem(file);
    this.uploadTemporario(file);
  }

  private criarPreviewImagem(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const target = e.target as FileReader;
      this.imagemPreview = target.result || null;
    };
    reader.readAsDataURL(file);
  }

  private uploadTemporario(file: File) {
  this.ativar_spinner = true;
  this.servicoService.enviarArquivo(file).subscribe(
    (res: any) => {
      this.imagemTemporaria = res.arquivo;
      this.imagemMarcadaParaExcluir = false;
      this.ativar_spinner = false;
    },
    (e) => {
      console.error('Erro upload temporário:', e);
      this.ativar_spinner = false;
      this.limparImagem();
    }
  );
}

  public removerImagem() {
    this.imagemMarcadaParaExcluir = true;
    this.imagemTemporaria = null;
    this.imagemPreview = null;
    this.arquivoSelecionado = null;
    const inputFile = document.getElementById('inputFile') as HTMLInputElement;
    if (inputFile) inputFile.value = '';
  }

  public desfazerRemocaoImagem() {
    this.imagemMarcadaParaExcluir = false;
  }

  public cancelarImagemTemporaria() {
    if (!this.imagemTemporaria) {
      this.limparImagem();
      return;
    }

    this.ativar_spinner = true;
    this.servicoService.cancelarImagem(this.imagemTemporaria).subscribe(
      () => this.limparImagem(),
      (erro) => console.warn('Falha ao remover imagem temporária:', erro)
    ).add(() => this.ativar_spinner = false);
  }

  public cadastrarServico() {
    this.ativar_spinner = true;

    const salvar = () => {
      this.servicoService.cadastrar(this.servico).subscribe(
        (res) => {
          sessionStorage.removeItem('servicoSession');
          this.fechar();
          this.ativar_spinner = false;
        },
        (e) => {
          console.error(e);
          this.mensagem = e.error.erro || 'Erro ao salvar serviço.';
          this.ativar_spinner = false;
        }
      );
    };

   if (this.imagemTemporaria) {
    this.servicoService.confirmarImagem({
      imagemNova: this.imagemTemporaria,
      imagemAntiga: this.imagemAntiga
    }).subscribe(() => {
      this.servico.nomeArquivo = this.imagemTemporaria;
      this.imagemAntiga = this.imagemTemporaria;
      this.imagemTemporaria = null;
      salvar();
    },
    (erro) => {
      console.log('Erro ao confirmar imagem:', erro);
      this.mensagem = 'Não foi possível confirmar a imagem.';
      this.ativar_spinner = false;
    }
  );
  return;
}

    if (this.imagemMarcadaParaExcluir && this.imagemAntiga) {
      const nomeAntigo = this.imagemAntiga;
      this.servicoService.deletarArquivo(nomeAntigo).subscribe(
        () => {
          this.servico.nomeArquivo = null;
          this.imagemAntiga = null;
          this.imagemMarcadaParaExcluir = false;
          salvar();
        },
        () => {
          this.servico.nomeArquivo = null;
          this.imagemAntiga = null;
          this.imagemMarcadaParaExcluir = false;
          salvar();
        }
      );
      return;
    }

    salvar();
  }

  public cancelar() {
    if (this.imagemTemporaria) {
      this.servicoService.cancelarImagem(this.imagemTemporaria).subscribe(
        () => console.log('Imagem temporária removida.'),
        (erro) => console.warn('Erro ao remover imagem temporária:', erro)
      );
      this.imagemTemporaria = null;
    }

    this.imagemMarcadaParaExcluir = false;
    sessionStorage.removeItem('servicoSession');
    this.fechar();
  }

  private limparImagem() {
    this.imagemPreview = null;
    this.arquivoSelecionado = null;
    this.imagemTemporaria = null;
    const inputFile = document.getElementById('inputFile') as HTMLInputElement;
    if (inputFile) inputFile.value = '';
  }
}
