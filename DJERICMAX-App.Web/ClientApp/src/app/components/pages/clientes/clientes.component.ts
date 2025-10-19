import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  public cliente: Cliente;
  public clientes: Cliente[];
  public modalAberta: string = "";
  public info: string;
  public tipo: string;
  public tela: string;
  public expandedClienteId: number | null = null;
  public expandedServicoId: number | null = null;
  public msg: string;
  clienteParaExcluir: any;
  indexParaExcluir: number;

  constructor(private clienteService: ClienteService, private router: Router) {
    this.clienteService.obterTodosclientes().subscribe(
      (clientes) => {
        console.log(clientes);
        this.clientes = clientes;
      },
      (e) => {}
    );
  }

  ngOnInit() {}

  mostrarEventos(cliente: any) {
    this.expandedClienteId = this.expandedClienteId === cliente.id ? null : cliente.id;
      this.expandedServicoId = null;
  }

  mostrarServicos(evento: any) {
    this.expandedServicoId = this.expandedServicoId === evento.id ? null : evento.id;
      // this.expandedClienteId = null;
  }

  get clientesFiltrados() {
    return this.clientes.filter((c) => c.ehCliente == 1);
  }

  public excluirCliente(cliente: Cliente) {
    this.clienteService.deletar(cliente).subscribe({
      next: () => {
        this.clientes = this.clientes.filter((c) => c.id !== cliente.id);
        // alert("Cliente deletado com sucesso!");
      },
      error: (e) => {
        console.error("Erro ao deletar cliente:", e);
        alert("Erro ao deletar cliente. Verifique o console.");
      },
    });
    this.fecharModal();
  }

  public gerarEvento(cliente: Cliente) {
    //ações para gerar eventos para o cliente vão aqui.
  }

  abrirModal(cliente: Cliente, tipo: string, clique: string, index: number) {
    // Acidionar Cliente, Evento e Serviço
    if (tipo == "addCliente") {
      sessionStorage.removeItem("clienteSession");
      this.info = "Cadastrar Cliente";
      this.tipo = tipo;
      this.modalAberta = clique;
    } else if (tipo == "addEvento") {
      sessionStorage.removeItem("eventoSession");
      this.info = "Cadastrar Evento";
      this.tipo = tipo;
      this.tela = 'cliente';
      this.modalAberta = clique;
    } else if (tipo == "addServico") {
      sessionStorage.removeItem("servicoSession");
      this.info = "Vincular Serviço ao Evento";
      this.tipo = tipo;
      this.tela = 'cliente';
      this.modalAberta = clique;
    }
    // Editar Cliente
    else if (tipo == "edit") {
      sessionStorage.setItem("clienteSession", JSON.stringify(cliente));
      this.info = "Editar Cliente";
      this.modalAberta = clique;
    } else if (tipo == "contrato") {
      cliente.ehCliente = 1;
      sessionStorage.setItem("clienteSession", JSON.stringify(cliente));
      this.info = "Contrato do Cliente";
      this.modalAberta = clique;
    } else if (tipo == "excluirCliente") {
      this.clienteParaExcluir = cliente;
      this.indexParaExcluir = index;
      this.info = "Excluir Cliente";
      this.msg = `
            Deseja excluir os dados de <b>${this.clienteParaExcluir.nome}
            ${this.clienteParaExcluir.sobreNome}</b>?`;
      this.modalAberta = tipo;
    }
    sessionStorage.setItem("clique", JSON.stringify(clique));
  }

  fecharModal() {
    this.modalAberta = "";
  }
}
