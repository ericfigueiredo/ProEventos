import { Component, OnInit } from '@angular/core';
import { Servicos } from 'src/app/models/servicos';
import { ServicosService } from 'src/app/services/servicos/servicos.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  public servicos: Servicos;
  constructor(private servicosService: ServicosService) { }

  ngOnInit() {
    this.servicos = new Servicos();
  }

  public cadastrar(){
    this.servicosService.cadastrar(this.servicos)
      .subscribe(
        servicosJson =>{
          console.log(servicosJson);

          
        },
        e => {
          console.log(e.error);
        }

      );
  }

}
