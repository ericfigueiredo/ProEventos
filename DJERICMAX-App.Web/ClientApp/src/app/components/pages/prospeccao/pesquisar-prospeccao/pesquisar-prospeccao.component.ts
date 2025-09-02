import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-pesquisar-prospeccao",
  templateUrl: "./pesquisar-prospeccao.component.html",
  styleUrls: ["./pesquisar-prospeccao.component.scss"],
})
export class PesquisarProspeccaoComponent implements OnInit {
  public cliente: Cliente;
  public clientes: Cliente[];
  public modalAberta: string = ""; // 'about', 'dados' ou vazio
  public info: string;
  public expandedClienteId: number | null = null;

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

  get clientesFiltrados() {
    return this.clientes.filter((c) => c.ehCliente == 0);
  }

  public adicionarCliente(clique: string) {
    sessionStorage.removeItem("clienteSession");
    sessionStorage.setItem("clique", JSON.stringify(clique));
    this.router.navigate(["/cadastrar-prospeccao"]);
  }

  public deletarCliente(cliente: Cliente) {
    const retorno = confirm("Deseja deletar os dados deste cliente?");

    if (retorno) {
      this.clienteService.deletar(cliente).subscribe({
        next: () => {
          this.clientes = this.clientes.filter((c) => c.id !== cliente.id);
          alert("Cliente deletado com sucesso!");
        },
        error: (e) => {
          console.error("Erro ao deletar cliente:", e);
          alert("Erro ao deletar cliente. Verifique o console.");
        },
      });
    }
  }

  public converterCliente(cliente: Cliente, clique: string) {
    cliente.ehCliente = 1;
    sessionStorage.setItem("clique", JSON.stringify(clique));
    sessionStorage.setItem("clienteSession", JSON.stringify(cliente));
    this.router.navigate(["/cadastrar-prospeccao"]);
  }

  gerarProposta(cliente: any) {
    // Se clicar no mesmo cliente, fecha. Se for outro, abre.
    this.expandedClienteId =
    this.expandedClienteId === cliente.id ? null : cliente.id;
}

  abrirModal(cliente: Cliente, tipo: string, clique: string) {
    if (tipo == 'add') {
      sessionStorage.removeItem("clienteSession");
      this.info = "Cadastrar Prospecção de Cliente";
    } else
    if (tipo == 'edit') {
      sessionStorage.setItem("clienteSession", JSON.stringify(cliente));
      this.info = "Editar Prospecção de Cliente";
    } else
    if (tipo == 'convert') {
      cliente.ehCliente = 1;
      sessionStorage.setItem("clienteSession", JSON.stringify(cliente));
      this.info = "Converter para Cliente";
    }
    sessionStorage.setItem("clique", JSON.stringify(clique));
    this.modalAberta = clique;
  }

  fecharModal() {
    this.modalAberta = "";
  }

}
