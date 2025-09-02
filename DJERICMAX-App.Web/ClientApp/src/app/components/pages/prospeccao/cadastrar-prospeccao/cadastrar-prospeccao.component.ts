import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cadastrar-prospeccao",
  templateUrl: "./cadastrar-prospeccao.component.html",
  styleUrls: ["./cadastrar-prospeccao.component.css"],
})
export class CadastrarProspeccaoComponent implements OnInit {
  @Input() info: string;
  @Input() client: Cliente;
  @Output() fecharModal = new EventEmitter<void>();
  public cliente: Cliente;
  public ativar_spinner: boolean;
  public mensagem: string;
  public clique;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {
    this.clique = JSON.parse(sessionStorage.getItem("clique"));
    sessionStorage.removeItem("clique");
    var clienteSession = sessionStorage.getItem("clienteSession");
    if (clienteSession) {
      this.cliente = JSON.parse(clienteSession);
    } else {
      this.cliente = new Cliente();
    }
  }

  fechar() {
    this.fecharModal.emit();
  }

  public cadastrarCliente() {
    this.ativarEspera();
    this.cliente.dataCadastro = new Date();
    this.clienteService.cadastrarCliente(this.cliente).subscribe(
      (clienteJson) => {
        console.log(clienteJson);
        this.mensagem = "";
        this.desativarEspera();
        this.fechar();
        // this.router.navigate(["/pesquisar-prospeccao"]);
        sessionStorage.removeItem("clienteSession");
      },
      (e) => {
        console.log(e.error);
        this.mensagem = e.error;
        this.desativarEspera();
      }
    );
  }

  public cancelar() {
    sessionStorage.removeItem("clienteSession");
    this.fechar();
    // this.router.navigate(["/pesquisar-prospeccao"]);
  }

  public ativarEspera() {
    this.ativar_spinner = true;
  }
  public desativarEspera() {
    this.ativar_spinner = false;
  }

  public ufs = [
    { id: 1, uf: "SP" },
    { id: 2, uf: "RJ" },
    { id: 3, uf: "MG" },
    { id: 4, uf: "MT" },
    { id: 5, uf: "RS" },
    { id: 6, uf: "MS" },
    { id: 7, uf: "AM" },
  ];

  public ufss = Array.from(new Set(this.ufs.map((u) => u.uf)));

  public Ufs(uf: string) {
    return this.ufs.filter((u) => u.uf === uf);
  }
}
