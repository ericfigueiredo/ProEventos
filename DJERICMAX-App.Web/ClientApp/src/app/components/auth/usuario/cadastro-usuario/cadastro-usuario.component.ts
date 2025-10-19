import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-cadastro-usuario",
  templateUrl: "./cadastro-usuario.component.html",
  styleUrls: ["./cadastro-usuario.component.css"],
})
export class CadastroUsuarioComponent implements OnInit {
  @Input() info: string;
  @Input() header: string;
  @Input() user: Usuario;
  @Output() cancelar = new EventEmitter<void>();

  public usuario: Usuario;
  public ativar_spinner: boolean;
  public mensagem: string;
  public clique;
  public usuarioCadastrado: boolean;
  public arquivoSelecionado: File;
  public imagemPreview: string | ArrayBuffer | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
     this.clique = JSON.parse(sessionStorage.getItem("clique"));
        sessionStorage.removeItem("clique");
        var usuarioSession = sessionStorage.getItem("usuarioSession");
        if (usuarioSession) {
          this.usuario = JSON.parse(usuarioSession);
        } else {
          this.usuario = new Usuario();
        }
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
      this.usuarioService.enviarArquivo(this.arquivoSelecionado).subscribe(
        (nomeArquivo) => {
          this.usuario.nomeArquivo = nomeArquivo;
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
    if (this.usuario.nomeArquivo) {
      this.usuario.nomeArquivo = null;
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

  public cadastrar() {
    this.ativar_spinner = true;
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      (usuarioJson) => {
        this.usuarioCadastrado = true;
        this.mensagem = "";
        this.ativar_spinner = false;
      },
      (e) => {
        this.mensagem = e.error;
        this.ativar_spinner = false;
      }
    );
  }

  onCancelar() {
    this.cancelar.emit();
  }

}

