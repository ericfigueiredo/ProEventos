import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {
  @Input() info: string;
  @Input() usuario: Usuario;
  @Output() fecharModal = new EventEmitter<void>();

  fechar() {
    this.fecharModal.emit();
  }
}