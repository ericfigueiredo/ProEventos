import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-annual-chart',
  templateUrl: './annual-chart.component.html',
  styleUrls: ['./annual-chart.component.scss']
})
export class AnnualChartComponent implements OnInit {

  constructor(private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 1500);
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          fontColor: '#9e9e9e',
          fontFamily: "'Roboto', sans-serif",
          fontSize: 12
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderDash: [3, 3],
          zeroLineColor: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#9e9e9e',
          fontFamily: "'Roboto', sans-serif",
          fontSize: 12,
          padding: 10
        }
      }]
    },
    plugins: {
      datalabels: {
        display: false
      },
      shadowBlur: {
        enabled: true,
        blur: 10,
        opacity: 0.2
      }
    },
    tooltips: {
      backgroundColor: '#424242',
      titleFontFamily: "'Roboto', sans-serif",
      bodyFontFamily: "'Roboto', sans-serif",
      bodyFontSize: 14,
      titleFontSize: 16,
      cornerRadius: 4,
      xPadding: 10,
      yPadding: 10,
      displayColors: false
    },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: '#9e9e9e',
        fontFamily: "'Roboto', sans-serif",
        fontSize: 12,
        padding: 20,
        usePointStyle: true,
        boxWidth: 10
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  // Troquei Label[] por string[]
  public barChartLabels: string[] = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartColors: Color[] = [
    { // Azul - Clientes cadastrados
      backgroundColor: '#4285F4',
      borderColor: '#4285F4',
      hoverBackgroundColor: '#3367D6',
      hoverBorderColor: '#3367D6'
    },
    { // Laranja - Festas agendadas
      backgroundColor: '#FF9100',
      borderColor: '#FF9100',
      hoverBackgroundColor: '#E65100',
      hoverBorderColor: '#E65100'
    },
    { // Verde - Festas realizadas
      backgroundColor: '#0F9D58',
      borderColor: '#0F9D58',
      hoverBackgroundColor: '#0B8043',
      hoverBorderColor: '#0B8043'
    }
  ];

  public barChartData: ChartDataSets[] = [
    {
      data: [3, 1, 2, 2, 1, 3, 4, 2, 0, 0, 0, 0],
      label: 'Clientes Cadastrados',
      barPercentage: 0.6,
      categoryPercentage: 0.8
    },
    {
      data: [3, 2, 4, 3, 4, 3, 2, 3, 1, 2, 3, 3],
      label: 'Festas Agendadas',
      barPercentage: 0.6,
      categoryPercentage: 0.8
    },
    {
      data: [3, 2, 4, 3, 4, 3, 1, 1, 0, 0, 0, 0],
      label: 'Festas Realizadas',
      barPercentage: 0.6,
      categoryPercentage: 0.8
    }
  ];
}
