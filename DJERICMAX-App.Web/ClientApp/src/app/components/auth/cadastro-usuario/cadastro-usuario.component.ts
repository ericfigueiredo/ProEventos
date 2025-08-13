import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  public usuario: Usuario;
  public ativar_spinner: boolean;
  public mensagem:string;
  public usuarioCadastrado: boolean;
  public arquivoSelecionado: File;

  constructor(private usuarioService: UsuarioService) {

  }

  public inputChange(files: FileList){
    this.arquivoSelecionado = files.item(0);
    this.ativar_spinner = true;
    this.usuarioService.enviarArquivo(this.arquivoSelecionado)
    .subscribe(
      nomeArquivo => {
        this.usuario.nomeArquivo = nomeArquivo;
        alert(this.usuario.nomeArquivo);
        console.log(nomeArquivo);
        this.ativar_spinner = false;
      },
      e => {
        console.log(e);
        this.ativar_spinner = false;
    })
    ;
  }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  public cadastrar(){
    this.ativar_spinner = true;

    this.usuarioService.cadastrarUsuario(this.usuario)
    .subscribe(
      usuarioJson => {
        this.usuarioCadastrado = true;
        this.mensagem = "";
        this.ativar_spinner = false;
      },
      e => {
        this.mensagem = e.error;
        this.ativar_spinner = false;
      }
    );
  }

}
