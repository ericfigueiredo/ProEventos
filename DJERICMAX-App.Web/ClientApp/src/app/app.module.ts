import { CadastroServicoComponent } from './components/pages/servico/cadastro-servico/cadastro-servico.component';
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
import { PesquisaServicoComponent } from './components/pages/servico/pesquisa-servico/pesquisa-servico.component';
import { ContratoComponent } from './components/pages/contrato/contrato.component';
import { EventoComponent } from './components/pages/evento/evento.component';
import { PosEventoComponent } from './components/pages/pos-evento/pos-evento.component';
import { RelatorioComponent } from './components/pages/relatorio/relatorio.component';

import { LojaPesquisaComponent } from './external/loja-pesquisa/loja-pesquisa.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContaClientesComponent } from './components/dashboard/conta-clientes/conta-clientes.component';
import { ContaContratosComponent } from './components/dashboard/conta-contratos/conta-contratos.component';
import { ContaEventosComponent } from './components/dashboard/conta-eventos/conta-eventos.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TruncateModule } from 'ng2-truncate';
import { AnnualChartComponent } from './components/dashboard/annual-chart/annual-chart.component';
import { LojaDetalheServicoComponent } from './external/loja-detalhe-servico/loja-detalhe-servico.component';
import { LojaEfetivarCompraComponent } from './external/loja-efetivar-compra/loja-efetivar-compra.component';
import { LojaCarrinhoComprasComponent } from './external/loja-carrinho-compras/loja-carrinho-compras.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { ExcluirServicoComponent } from './components/layout/confirms/excluir-servico/excluir-servico.component';
import { LimparCarrinhoComponent } from './components/layout/confirms/limpar-carrinho/limpar-carrinho.component';
import { ClienteService } from './services/cliente.service';
import { EventoService } from './services/evento.service';
import { CadastrarProspeccaoComponent } from './components/pages/prospeccao/cadastrar-prospeccao/cadastrar-prospeccao.component';
import { PesquisarProspeccaoComponent } from './components/pages/prospeccao/pesquisar-prospeccao/pesquisar-prospeccao.component';
import { ClientesComponent } from './components/pages/clientes/clientes.component';
import { AboutComponent } from './components/auth/about/about.component';

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
    CadastroServicoComponent,
    ContratoComponent,
    EventoComponent,
    PosEventoComponent,
    RelatorioComponent,
    MeusDadosComponent,
    AjudaUsuarioComponent,
    PesquisaServicoComponent,
    LojaPesquisaComponent,
    DashboardComponent,
    ContaClientesComponent,
    ContaContratosComponent,
    ContaEventosComponent,
    AnnualChartComponent,
    LojaDetalheServicoComponent,
    LojaEfetivarCompraComponent,
    LojaCarrinhoComprasComponent,
    ExcluirServicoComponent,
    LimparCarrinhoComponent,
    CadastrarProspeccaoComponent,
    PesquisarProspeccaoComponent,
    ClientesComponent,
    AboutComponent,
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
    ExcluirServicoComponent,
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
      { path: '', component: LoginComponent, pathMatch: 'full'},
      { path: 'novo-usuario', component: CadastroUsuarioComponent},
      // { path: 'meus-dados', component: MeusDadosComponent, data: { title: 'Meus dados' }, canActivate:[GuardaRotas]},
      // { path: 'about', component: AboutComponent, data: { title: 'Sobre o Sistema EventPro' }, canActivate:[GuardaRotas]},
      { path: 'ajuda-usuario', component: AjudaUsuarioComponent, data: { title: 'Ajuda' }, canActivate:[GuardaRotas]},

      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard de Eventos' }, canActivate:[GuardaRotas]},

      { path: 'cadastrar-servico', component: CadastroServicoComponent, data: { title: 'Cadastrar Serviço' }, canActivate:[GuardaRotas]},
      { path: 'pesquisar-servico', component: PesquisaServicoComponent, data: { title: 'Pesquisar Serviços' }, canActivate:[GuardaRotas]},

      { path: 'detalhe-servico', component: LojaDetalheServicoComponent, data: { title: 'Detalhes de Serviços' }, canActivate:[GuardaRotas]},
      { path: 'vincular-servico', component: LojaPesquisaComponent, data: { title: 'Pacotes de Serviços' }, canActivate:[GuardaRotas]},
      { path: 'contratar-serviço', component: LojaEfetivarCompraComponent, data: { title: 'Carrinho de Serviços' }, canActivate:[GuardaRotas]},

      { path: 'cadastrar-prospeccao', component: CadastrarProspeccaoComponent, data: { title: 'Cadastro/Edição de Clientes' }, canActivate:[GuardaRotas]},
      { path: 'pesquisar-prospeccao', component: PesquisarProspeccaoComponent, data: { title: 'Possíveis Clientes' }, canActivate:[GuardaRotas]},
      { path: 'pesquisar-cliente', component: ClientesComponent, data: { title: 'Clientes' }, canActivate:[GuardaRotas]},

      // { path: 'home', component: HomeComponent, data: { title: 'Dashboard de Eventos' }, canActivate:[GuardaRotas]},
      // { path: 'servico', component: ServicoComponent, canActivate:[GuardaRotas]},

      { path: 'contrato', component: ContratoComponent, data: { title: 'Contratos Fechados' }, canActivate:[GuardaRotas]},
      { path: 'evento', component: EventoComponent, data: { title: 'Eventos Agendados' }, canActivate:[GuardaRotas]},
      { path: 'pos-evento', component: PosEventoComponent, data: { title: 'Pós-Eventos' }, canActivate:[GuardaRotas]},
      { path: 'relatorio', component: RelatorioComponent, data: { title: 'Relatórios' }, canActivate:[GuardaRotas]},

    ])
  ]

})
export class AppModule { }
