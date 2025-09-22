import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-modalExcluir",
  templateUrl: "./modalExcluir.component.html",
  styleUrls: ["./modalExcluir.component.css"],
})
export class ModalExcluirComponent implements OnInit {
  @Input() info: string;
  @Input() msg: string;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onConfirmar() {
    this.confirmar.emit();
  }

  onCancelar() {
    this.cancelar.emit();
  }
}


