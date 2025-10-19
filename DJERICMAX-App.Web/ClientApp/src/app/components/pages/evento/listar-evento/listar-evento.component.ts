import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Evento } from "src/app/models/evento";
import { Parcela } from "src/app/models/parcela";

import { EventoService } from "src/app/services/evento.service";

@Component({
  selector: "app-listar-evento",
  templateUrl: "./listar-evento.component.html",
  styleUrls: ["./listar-evento.component.scss"],
  providers: [DatePipe] // 👈 injeta o DatePipe
})
export class ListarEventoComponent implements OnInit {
  public evento: Evento;
  public eventos: Evento[];
  public modalAberta: string = "";
  public info: string;
  public tipo: string;
  public tela: string;
  public msg: string;
  eventoParaExcluir: any;
  indexParaExcluir: number;
  expandEnderecoId: number | null = null;
  expandClienteId: number | null = null;
  expandFormaPagtoId: number | null = null;
  expandParcelasId: number | null = null;

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.eventoService.obterTodosEventos().subscribe(
      (eventos) => {
        console.log(eventos);
        this.eventos = eventos;
      },
      (e) => {}
    );
  }

  ngOnInit() {}

  // get eventosFiltrados() {
  //     return this.eventos.filter((c) => c.ehEvento == 0);
  //   }

  public adicionarEvento(clique: string) {
    sessionStorage.removeItem("eventoSession");
    sessionStorage.setItem("clique", JSON.stringify(clique));
    this.router.navigate(["/cadastrar-evento"]);
  }

  public excluirEvento(evento: Evento) {
    this.eventoService.deletar(evento).subscribe({
      next: () => {
        this.eventos = this.eventos.filter((c) => c.id !== evento.id);
        // alert("evento deletado com sucesso!");
      },
      error: (e) => {
        console.error("Erro ao deletar evento:", e);
        alert("Erro ao deletar evento. Verifique o console.");
      },
    });
    this.fecharModal();
  }

  marcar(event: Event, evento: any, tipo: string, index: number) {
    const input = event.target as HTMLInputElement;
    switch (tipo) {
      case 'proposta':
        if (input.checked) {
          evento.proposta = true;
        } else {
          evento.proposta = true;
          input.checked = true;
        }
        this.salvarChecked(evento);
      break;
      case 'fechado':
        if (input.checked) {
          evento.fechado = true;
        } else {
          evento.fechado = true;
          input.checked = true;
        }
        this.salvarChecked(evento);
      break;
      case 'realizado':
        if (input.checked) {
          evento.realizado = true;
        } else {
          evento.realizado = true;
          input.checked = true;
        }
        this.salvarChecked(evento);
      break;
      case 'parcelaPaga':
        if (input.checked) {
          evento.parcelas[index].pago = true;
        } else {
          evento.parcelas[index].pago = true;
          input.checked = true;
        }
        this.pagarChecked(evento, evento.parcelas[index]);
      break;
      default:

      break;
    }
  }

  public salvarChecked(evento: Evento) {
    this.eventoService.cadastrar(evento).subscribe(
      (eventoJson) => {
        console.log(eventoJson);
      },
      (e) => {
        console.log(e.error);
      }
    );
  }

  public pagarChecked(evento: Evento, parcela: Parcela) {
    this.eventoService.pagar(evento.id, parcela.id).subscribe(
      (eventoJson) => {
        alert("Parcela paga com sucesso.");
        console.log(eventoJson);
      },
      (e) => {
        console.log(e.error);
      }
    );
  }

  mostrarEndereco(evento: any) {
    this.expandEnderecoId = this.expandEnderecoId === evento.id ? null : evento.id;
    this.expandClienteId = null;
    this.expandFormaPagtoId = null;
    this.expandParcelasId = null;
  }

  mostrarCliente(evento: any) {
  this.expandClienteId = this.expandClienteId === evento.id ? null : evento.id;
  this.expandEnderecoId = null;
  this.expandFormaPagtoId = null;
  this.expandParcelasId = null;
}

  mostrarFormaPagto(evento: any) {
    this.expandFormaPagtoId = this.expandFormaPagtoId === evento.id ? null : evento.id;
    this.expandEnderecoId = null;
    this.expandClienteId = null;
    this.expandParcelasId = null;
  }

  mostrarParcelas(evento: any) {
    this.expandParcelasId = this.expandParcelasId === evento.id ? null : evento.id;
    this.expandEnderecoId = null;
    this.expandClienteId = null;
    // this.expandFormaPagtoId = null;
  }

  abrirModal(evento: Evento, tipo: string, clique: string, index: number) {
    this.tipo = tipo;
    if (tipo == "addEvento") {
      sessionStorage.removeItem("eventoSession");
      this.info = "Cadastrar Evento";
      this.modalAberta = clique;
    } else if (tipo == "editarEvento") {
      sessionStorage.setItem("eventoSession", JSON.stringify(evento));
      this.info = "Editar Evento";
      this.tela = 'evento';
      this.modalAberta = clique;
      console.log(evento);
    } else if (tipo == "verContrato") {
      this.evento = { ...evento };
      sessionStorage.setItem("eventoSession", JSON.stringify(this.evento));
      this.info = "Contratos";
      this.tipo = tipo;
      this.modalAberta = clique;
    } else if (tipo == "excluirEvento") {
      this.eventoParaExcluir = evento;
      this.indexParaExcluir = index;
      this.info = "Excluir Evento";
      let agendRealizado = this.eventoParaExcluir.realizado == true ? 'realizado em' : 'agendado para';
      let dataFormatada = this.datePipe.transform(
        this.eventoParaExcluir.dataEvento, 'dd/MM/yyyy');
      this.msg = `
            Deseja excluir o evento <b>${this.eventoParaExcluir.nomeEvento}</b>
            ${agendRealizado} ${dataFormatada}?`;
      this.modalAberta = tipo;
    }

    sessionStorage.setItem("clique", JSON.stringify(clique));
  }

  fecharModal() {
    this.modalAberta = "";
  }
}
