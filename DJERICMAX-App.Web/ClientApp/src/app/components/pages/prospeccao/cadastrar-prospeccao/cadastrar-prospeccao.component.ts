import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cadastrar-prospeccao',
  templateUrl: './cadastrar-prospeccao.component.html',
  styleUrls: ['./cadastrar-prospeccao.component.css']
})
export class CadastrarProspeccaoComponent implements OnInit {
    public cliente: Cliente;
    public ativar_spinner: boolean;
    public mensagem:string;

  constructor(private clienteService: ClienteService,
                private router: Router ) { }

  ngOnInit() {
    this.cliente = new Cliente();
    var clienteSession = sessionStorage.getItem('clienteSession');
        if (clienteSession) {
          this.cliente = JSON.parse(clienteSession);
        } else {
          this.cliente = new Cliente();
        }
  }

  public cadastrarCliente(){
    this.ativarEspera();
    this.clienteService.cadastrarCliente(this.cliente)
      .subscribe(
        clienteJson =>{
          console.log(clienteJson);
          this.mensagem = "";
          this.desativarEspera()
          this.router.navigate(['/dashboard']);
          // this.router.navigate(['/prospeccao']);
          sessionStorage.removeItem('clienteSession');
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.desativarEspera()
        }

      );
  }

  public cancelar(){
    sessionStorage.removeItem('clienteSession');
    this.router.navigate(['/Pesquisar-cliente']);
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
