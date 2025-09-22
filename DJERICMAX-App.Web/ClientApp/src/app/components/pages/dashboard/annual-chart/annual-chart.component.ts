import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Cliente } from 'src/app/models/cliente';
import { Evento } from 'src/app/models/evento';
import { ClienteService } from 'src/app/services/cliente.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-annual-chart',
  templateUrl: './annual-chart.component.html',
  styleUrls: ['./annual-chart.component.scss']
})
export class AnnualChartComponent implements OnInit {

  public clientes: Cliente[] = [];
  public eventos: Evento[] = [];

  public totalGeralClientes: number = 0;
  public totalAtualClientes: number = 0; // clientes de 2025

  public totalGeralEventos: number = 0;
  public totalAtualEventos: number = 0; // eventos de 2025

  public totalGeralRealizados: number = 0;
  public totalAtualRealizados: number = 0; // realizados em 2025

  public clientesPorMes: number[] = Array(12).fill(0);
  public eventosPorMes: number[] = Array(12).fill(0);
  public realizadosPorMes: number[] = Array(12).fill(0);

  // Gráfico
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: { display: false },
        ticks: { fontColor: '#3f3f3f', fontFamily: "'Roboto', sans-serif", fontSize: 12 }
      }],
      yAxes: [{
        gridLines: { color: 'rgba(0,0,0,0.3)', borderDash: [3,3], zeroLineColor: 'rgba(0,0,0,0.3)' },
        ticks: { beginAtZero: true, fontColor: '#3f3f3f', fontFamily: "'Roboto', sans-serif", fontSize: 12, padding: 10 }
      }]
    },
    legend: { position: 'bottom', labels: { fontColor: '#9e9e9e', fontFamily: "'Roboto', sans-serif", fontSize: 12, usePointStyle: true, boxWidth: 10 } },
    tooltips: { backgroundColor: '#424242', titleFontFamily: "'Roboto', sans-serif", bodyFontFamily: "'Roboto', sans-serif", bodyFontSize: 14, titleFontSize: 16, cornerRadius: 4, xPadding: 10, yPadding: 10, displayColors: false }
  };

  public barChartLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    { backgroundColor: '#4285F4' },
    { backgroundColor: '#FF9100' },
    { backgroundColor: '#0F9D58' }
  ];
  public barChartData: ChartDataSets[] = [
    { data: this.clientesPorMes, label: 'Clientes Cadastrados', barPercentage: 0.6, categoryPercentage: 0.8 },
    { data: this.eventosPorMes, label: 'Eventos Agendados', barPercentage: 0.6, categoryPercentage: 0.8 },
    { data: this.realizadosPorMes, label: 'Eventos Realizados', barPercentage: 0.6, categoryPercentage: 0.8 }
  ];

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private clienteService: ClienteService,
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.ngxLoader.start();

    // Carregar clientes e eventos em paralelo
    this.clienteService.obterTodosclientes().subscribe(clientes => {
      this.clientes = clientes;
      this.totalGeralClientes = clientes.length;
      this.clientesPorMes = Array(12).fill(0);

      clientes.forEach(c => {
        const data = new Date(c.data_Cadastro);
        if (data.getFullYear() === 2025) {
          this.totalAtualClientes++;
          this.clientesPorMes[data.getMonth()]++;
        }
      });

      // Atualiza dados do gráfico
      this.barChartData[0].data = [...this.clientesPorMes];
    }, e => console.error(e));

    this.eventoService.obterTodosEventos().subscribe(eventos => {
      this.eventos = eventos;
      this.totalGeralEventos = eventos.length;
      this.totalGeralRealizados = eventos.filter(e => e.realizado).length;

      this.eventosPorMes = Array(12).fill(0);
      this.realizadosPorMes = Array(12).fill(0);

      eventos.forEach(e => {
        const data = new Date(e.dataEvento);
        if (data.getFullYear() === 2025) {
          this.totalAtualEventos++;
          this.eventosPorMes[data.getMonth()]++;
          if (e.realizado) {
            this.totalAtualRealizados++;
            this.realizadosPorMes[data.getMonth()]++;
          }
        }
      });

      // Atualiza dados do gráfico
      this.barChartData[1].data = [...this.eventosPorMes];
      this.barChartData[2].data = [...this.realizadosPorMes];

      this.ngxLoader.stop();
    }, e => {
      console.error(e);
      this.ngxLoader.stop();
    });
  }
}
