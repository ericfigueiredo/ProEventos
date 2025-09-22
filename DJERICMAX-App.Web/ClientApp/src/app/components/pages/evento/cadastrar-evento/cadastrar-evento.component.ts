import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { Evento } from "src/app/models/evento";
import { Servico } from "src/app/models/servico";
import { EventoService } from "src/app/services/evento.service";
import { CarrinhoServicoComponent } from "../../servico/carrinho-servico/carrinho-servico.component";

@Component({
  selector: "app-cadastrar-evento",
  templateUrl: "./cadastrar-evento.component.html",
  styleUrls: ["./cadastrar-evento.component.scss"],
})
export class CadastrarEventoComponent implements OnInit {
  public evento: Evento;
  public eventos: Evento[];
  public cliente: Cliente;
  public clientes: Cliente[];
  public ativar_spinner: boolean;
  public mensagem: string;
  public eventoCadastrado: boolean;
  public clique;
  @Output() fecharModal = new EventEmitter<void>();
  @Input() info: string;
  @Input() tipo: string;
  @Input() tab: string;
  activeTab: string = 'evento';
  // @Input() client: Cliente;
  // @Input() event: Evento;
  // @Input() servic: Servico;


  constructor(private eventoService: EventoService,
              private router: Router) {}

  ngOnInit() {
    this.activeTab = this.tab;
    this.clique = JSON.parse(sessionStorage.getItem("clique"));
    sessionStorage.removeItem("clique");
    var clienteSession = sessionStorage.getItem("clienteSession");
    this.cliente = JSON.parse(clienteSession);
    var eventoSession = sessionStorage.getItem("eventoSession");
    if (eventoSession) {
      this.evento = JSON.parse(eventoSession);
    } else {
      // this.evento = new Evento();
    }
  }

   fechar() {
    this.fecharModal.emit();
  }

  public cadastrarEvento(){
    this.ativarEspera();
    this.eventoService.cadastrar(this.evento)
      .subscribe(
        eventoJson =>{
          console.log(eventoJson);
          this.mensagem = "";
          this.desativarEspera()
          this.fechar();
          sessionStorage.removeItem('eventoSession');
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.desativarEspera()
          this.fechar();
        }
      );
  }

  public vincularServico(){
  // Aqui serão definidas instruções para vincular um serviço ao evento criado
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  public cancelar(){
    sessionStorage.removeItem('eventoSession');
    this.fechar();
  }

  public ativarEspera(){
    this.ativar_spinner = true;
  }
  public desativarEspera(){
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
