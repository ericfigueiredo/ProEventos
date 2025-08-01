import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  public usuario: Usuario;
  public ativar_spinner: boolean;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  public cadastrar(){
    alert(
      `Nome: ${this.usuario.nome}\n` +
      `Sobrenome: ${this.usuario.sobreNome}\n` +
      `CPF: ${this.usuario.cpf}\n` +
      `RG: ${this.usuario.rg}\n` +
      `Email: ${this.usuario.email}\n` +
      `Senha: ${this.usuario.senha}\n` +
      `Foto: ${this.usuario.fotoUrl}`
    );
    // this.usuarioService.cadastrarUsuario(this.usuario)
    // .subscribe(
    //   usuarioJson => {

    //   },
    //   e => {

    //   }
    // );
  }

}
