import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @Input() info: string;
  @Input() titulo: string = 'Sobre o sistema EventPro';
  @Output() fecharModal = new EventEmitter<void>();

  fechar() {
    this.fecharModal.emit();
  }
}