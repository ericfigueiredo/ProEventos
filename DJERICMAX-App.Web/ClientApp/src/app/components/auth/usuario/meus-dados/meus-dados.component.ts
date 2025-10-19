import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent implements OnInit {
  @Input() info: string;
  @Input() usuario: Usuario;
  @Output() fecharModal = new EventEmitter<void>();
  public tipoConta: string;

  ngOnInit(): void {
    if (this.usuario.ehAdministrador) {
      this.tipoConta = 'Administrador'
    } else {
      this.tipoConta = 'Usuário'
    }
  }

  fechar() {
    this.fecharModal.emit();
  }
}
