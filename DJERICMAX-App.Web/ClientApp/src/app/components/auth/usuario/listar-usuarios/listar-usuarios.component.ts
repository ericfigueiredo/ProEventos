import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  @Input() info!: string;
  @Input() user!: Usuario;
  public tipo: string;
  public tela: string;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() fechaModal = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() abrirCadastro = new EventEmitter<void>();
  public header: string;
  public modalAberta: string = "";
  public tipoConta: string;
  public usuarios: Usuario[] = [];
  public msg: string;
  usuarioParaExcluir: any;
  indexParaExcluir: number;
  
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuarios()
    this.defineConta();
  }

  carregarUsuarios(){
    this.usuarioService.obterTodosUsuarios().subscribe(
        (usuarios) => {
          console.log(usuarios);
          this.usuarios = usuarios;
        },
        (e) => {}
      );
  }

  defineConta(){
    if (this.user.ehAdministrador) {
      this.tipoConta = 'Administrador'
    } else {
      this.tipoConta = 'Usuário'
    }
  }
  
  abreCadastro() {
    this.abrirCadastro.emit();
  }

  public excluirUsuario(usuario: Usuario) {
      this.usuarioService.deletarUsuario(usuario).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter((c) => c.id !== usuario.id);
          // alert("usuario deletado com sucesso!");
        },
        error: (e) => {
          console.error("Erro ao deletar usuario:", e);
          alert("Erro ao deletar usuario. Verifique o console.");
        },
      });
      this.fechar();
    }

  abrirModal(usuario: Usuario, tipo: string, clique: string, index: number) {
      // Acidionar Cliente, Evento e Serviço
      if (tipo == "add") {
        sessionStorage.removeItem("usuarioSession");
        this.header = "Cadastrar Usuário";
        this.tipo = tipo;
        this.modalAberta = clique;
      }
      // Editar usuario
      else if (tipo == "edit") {
        sessionStorage.setItem("usuarioSession", JSON.stringify(usuario));
        this.header = "Editar Usuário";
        this.tipo = tipo;
        this.modalAberta = clique;
      }
      //Converter usuario
      else if (tipo == "convert") {
        this.usuarios[index].ehAdministrador = true;
        sessionStorage.setItem("usuarioSession", JSON.stringify(usuario));
        this.header = "Converter Usuário";
        this.tipo = tipo;
        this.modalAberta = clique;
      }
      //Excluir usuario
      else if (tipo == "excluirUsuario") {
        this.usuarioParaExcluir = usuario;
        this.indexParaExcluir = index;
        this.header = "Excluir Usuário";
        this.tela = "usuario";
        this.msg = `
        <div class="row">
          <div class="col-md-9">
            Deseja excluir os dados de <b>${this.usuarioParaExcluir.nome}
                ${this.usuarioParaExcluir.sobreNome}</b>?
          </div>
          <div class="col-md-3 image-preview-elegant">
            <img src="../../../../../../../ftsUsuarios/${this.usuarioParaExcluir.nomeArquivo}"
            class="preview-circle delete-preview">
          </div>
        </div>
        `;
        this.modalAberta = tipo;
      }
      sessionStorage.setItem("clique", JSON.stringify(clique));
    }

    fecharModalExcluir() {
      if (this.modalAberta === 'excluirUsuario') {
        this.modalAberta = "";
        this.usuarioParaExcluir = null;
        this.indexParaExcluir = -1;
      }
    }

    fecharModalCadastrar() {
      if (this.modalAberta === 'usuario') {
        this.modalAberta = "";
      }
    }

  fechar() {
    this.fecharModal.emit();
  }
  
}

