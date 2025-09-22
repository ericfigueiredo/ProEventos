import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-conta-clientes',
  templateUrl: './conta-clientes.component.html',
  styleUrls: ['./conta-clientes.component.css']
})
export class ContaClientesComponent implements OnInit {
  public clientes: Cliente[] = [];
  public totalGeral: number = 0;
  public totalAtual: number = 0; /* últimos 3 meses */

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.contaClientes();
  }

  contaClientes(){
    this.clienteService.obterTodosclientes().subscribe(
        (clientes) => {
          this.clientes = clientes;
          this.totalGeral = clientes.length;
          this.totalAtual = clientes.filter(c =>
            new Date(c.data_Cadastro) >= new Date(
              new Date().setMonth(
                new Date().getMonth() - 3))).length;

          console.log('Atual: ' + this.totalAtual + ', geral: ' + this.totalGeral)
        },
        (e) => {
          console.error(e);
        }
      );
  }



}