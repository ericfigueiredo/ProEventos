import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GuardaRotas } from './autorizer/guardarotas';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/layout/nav-menu/nav-menu.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';

import { LoginComponent } from './components/auth/login/login.component';
import { CadastroUsuarioComponent } from './components/auth/cadastro-usuario/cadastro-usuario.component';

import { UsuarioService } from './services/usuario.service';
import { ServicoService } from './services/servico.service';

import { PageTitleComponent } from './components/layout/page-title/page-title.component';
import { MeusDadosComponent } from './components/auth/meus-dados/meus-dados.component';
import { AjudaUsuarioComponent } from './components/auth/ajuda-usuario/ajuda-usuario.component';
import { ContratoComponent } from './components/pages/contrato/contrato.component';
import { EventoComponent } from './components/pages/evento/evento.component';
import { RealizadoComponent } from './components/pages/realizado/realizado.component';
import { RelatorioComponent } from './components/pages/relatorio/relatorio.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ContaClientesComponent } from './components/pages/dashboard/conta-clientes/conta-clientes.component';
import { ContaContratosComponent } from './components/pages/dashboard/conta-contratos/conta-contratos.component';
import { ContaEventosComponent } from './components/pages/dashboard/conta-eventos/conta-eventos.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TruncateModule } from 'ng2-truncate';
import { AnnualChartComponent } from './components/pages/dashboard/annual-chart/annual-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { ClienteService } from './services/cliente.service';
import { EventoService } from './services/evento.service';
import { CadastrarProspeccaoComponent } from './components/pages/prospeccao/cadastrar-prospeccao/cadastrar-prospeccao.component';
import { PesquisarProspeccaoComponent } from './components/pages/prospeccao/pesquisar-prospeccao/pesquisar-prospeccao.component';
import { ClientesComponent } from './components/pages/clientes/clientes.component';
import { AboutComponent } from './components/auth/about/about.component';
import { CadastrarServicoComponent } from './components/pages/servico/cadastrar-servico/cadastrar-servico.component';
import { ListaServicoComponent } from './components/pages/servico/lista-servico/lista-servico.component';
import { PesquisaServicoComponent } from './components/pages/servico/pesquisa-servico/pesquisa-servico.component';
import { DetalheServicoComponent } from './components/pages/servico/detalhe-servico/detalhe-servico.component';
import { ContratarServicoComponent } from './components/pages/servico/contratar-servico/contratar-servico.component';
import { CarrinhoServicoComponent } from './components/pages/servico/carrinho-servico/carrinho-servico.component';
import { ModalExcluirComponent } from './components/layout/modalExcluir/modalExcluir.component';
import { LimparCarrinhoComponent } from './components/pages/servico/limpar-carrinho/limpar-carrinho.component';
import { CadastrarEventoComponent } from './components/pages/evento/cadastrar-evento/cadastrar-evento.component';
import { ListarEventoComponent } from './components/pages/evento/listar-evento/listar-evento.component';
import { LoaderComponent } from './components/layout/loader/loader.component';
import { ModalConfirmComponent } from './components/layout/modal-confirm/modal-confirm.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({

  declarations: [
    AppComponent,
    NavMenuComponent,
    SidebarComponent,
    FooterComponent,
    PageTitleComponent,
    HomeComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    CadastrarServicoComponent,
    ContratoComponent,
    EventoComponent,
    RealizadoComponent,
    RelatorioComponent,
    MeusDadosComponent,
    AjudaUsuarioComponent,
    ListaServicoComponent,
    PesquisaServicoComponent,
    DashboardComponent,
    ContaClientesComponent,
    ContaContratosComponent,
    ContaEventosComponent,
    AnnualChartComponent,
    DetalheServicoComponent,
    ContratarServicoComponent,
    CarrinhoServicoComponent,
    ModalExcluirComponent,
    LimparCarrinhoComponent,
    CadastrarProspeccaoComponent,
    PesquisarProspeccaoComponent,
    ClientesComponent,
    AboutComponent,
    CadastrarEventoComponent,
    ListarEventoComponent,
    LoaderComponent,
    ModalConfirmComponent,
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CurrencyPipe,
    ClienteService,
    UsuarioService,
    ServicoService,
    EventoService
  ],

  entryComponents: [
    ModalExcluirComponent,
    AboutComponent,
    MeusDadosComponent
  ], // obrigatório no Angular < 9

  bootstrap: [AppComponent],

  imports: [
    ChartsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,  // Necessário para Material
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    TruncateModule,
    MatIconModule,

    RouterModule.forRoot([
      { path: 'entrar', component: LoginComponent, pathMatch: 'full'},
      { path: '', component: DashboardComponent, data: { title: 'Dashboard de Eventos' }, canActivate:[GuardaRotas]},
      { path: 'novo-usuario', component: CadastroUsuarioComponent},
      // { path: 'meus-dados', component: MeusDadosComponent, data: { title: 'Meus dados' }, canActivate:[GuardaRotas]},
      // { path: 'about', component: AboutComponent, data: { title: 'Sobre o Sistema EventPro' }, canActivate:[GuardaRotas]},
      { path: 'ajuda-usuario', component: AjudaUsuarioComponent, data: { title: 'Ajuda' }, canActivate:[GuardaRotas]},


      { path: 'cadastrar-servico', component: CadastrarServicoComponent, data: { title: 'Cadastrar Serviço' }, canActivate:[GuardaRotas]},
      { path: 'listar-servico', component: ListaServicoComponent, data: { title: 'Lista de Serviços' }, canActivate:[GuardaRotas]},
      { path: 'contratar-serviço', component: ContratarServicoComponent, data: { title: 'Pacotes para o Evento' }, canActivate:[GuardaRotas]},
      { path: 'detalhe-servico', component: DetalheServicoComponent, data: { title: 'Detalhes de Serviços' }, canActivate:[GuardaRotas]},
      { path: 'pesquisar-servico', component: PesquisaServicoComponent, data: { title: 'Pesquisa de Serviços' }, canActivate:[GuardaRotas]},


      { path: 'cadastrar-prospeccao', component: CadastrarProspeccaoComponent, data: { title: 'Cadastro/Edição de Clientes' }, canActivate:[GuardaRotas]},
      { path: 'pesquisar-prospeccao', component: PesquisarProspeccaoComponent, data: { title: 'Prospecção de Clientes' }, canActivate:[GuardaRotas]},
      { path: 'pesquisar-cliente', component: ClientesComponent, data: { title: 'Clientes' }, canActivate:[GuardaRotas]},

      { path: 'listar-evento', component: ListarEventoComponent, data: { title: 'Lista de Eventos' }, canActivate:[GuardaRotas]},
      { path: 'cadastrar-evento', component: CadastrarEventoComponent, data: { title: 'Cadastrar Evento' }, canActivate:[GuardaRotas]},

      { path: 'contrato', component: ContratoComponent, data: { title: 'Contratos Fechados' }, canActivate:[GuardaRotas]},
      { path: 'evento', component: EventoComponent, data: { title: 'Eventos Agendados' }, canActivate:[GuardaRotas]},
      { path: 'realizado', component: RealizadoComponent, data: { title: 'Eventos realizados' }, canActivate:[GuardaRotas]},
      { path: 'relatorio', component: RelatorioComponent, data: { title: 'Relatórios' }, canActivate:[GuardaRotas]},

    ])
  ]

})
export class AppModule { }
