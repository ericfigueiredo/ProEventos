import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

public meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];


constructor() { }

ngOnInit() { }

public dadosEventos = [
  {
    label: 'Festas Concluídas',
    data: [2, 1, 3, 2, 2, 2, 0, null, null, null, null, null],
    backgroundColor: '#4CAF50'
  },
  {
    label: 'Festas Agendadas',
    data: [null, null, null, null, null, null, 0, 2, 1, 2, 1, 2],
    backgroundColor: '#2196F3'
  }
];

public chartOptions: any = {
  responsive: true,
  scales: {
    yAxes: [{
      ticks: { beginAtZero: true, precision: 0 }
    }]
  }
};

}
