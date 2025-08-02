import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { GuardaRotas } from './autorizer/guardarotas';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/layout/nav-menu/nav-menu.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ServicosComponent } from './components/pages/servicos/servicos.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CadastroUsuarioComponent } from './components/auth/cadastro-usuario/cadastro-usuario.component';

import { UsuarioService } from './services/usuario/usuario.service';
import { ServicosService } from './services/servicos/servicos.service';
import { ProspeccaoComponent } from './components/pages/prospeccao/prospeccao.component';
import { EventosComponent } from './components/pages/eventos/eventos.component';
import { PosEventosComponent } from './components/pages/pos-eventos/pos-eventos.component';
import { RelatoriosComponent } from './components/pages/relatorios/relatorios.component';
import { ContratosComponent } from './components/pages/contratos/contratos.component';
import { PageTitleComponent } from './components/layout/page-title/page-title.component';
import { MeusDadosComponent } from './components/auth/meus-dados/meus-dados.component';
import { AjudaUsuarioComponent } from './components/auth/ajuda-usuario/ajuda-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    ServicosComponent,
    LoginComponent,
    ContratosComponent,
    CadastroUsuarioComponent,
    ProspeccaoComponent,
    EventosComponent,
    PosEventosComponent,
    RelatoriosComponent,
    PageTitleComponent,
    MeusDadosComponent,
    AjudaUsuarioComponent
  ],
  providers: [
    UsuarioService,
    ServicosService
  ],
  bootstrap: [AppComponent],

  imports: [
    ChartsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full'},
      { path: 'novo-usuario', component: CadastroUsuarioComponent},
      { path: 'home', component: HomeComponent, data: { title: 'Dashboard' }, canActivate:[GuardaRotas]},
      // { path: 'servicos', component: ServicosComponent, canActivate:[GuardaRotas]},
      { path: 'servicos', component: ServicosComponent, data: { title: 'Serviços' }},
      { path: 'prospeccao', component: ProspeccaoComponent, data: { title: 'Prospecção' }, canActivate:[GuardaRotas]},
      { path: 'contratos', component: ContratosComponent, data: { title: 'Contratos' }, canActivate:[GuardaRotas]},
      { path: 'eventos', component: EventosComponent, data: { title: 'Eventos' }, canActivate:[GuardaRotas]},
      { path: 'pos-eventos', component: PosEventosComponent, data: { title: 'Pós-Eventos' }, canActivate:[GuardaRotas]},
      { path: 'relatorios', component: RelatoriosComponent, data: { title: 'Relatórios' }, canActivate:[GuardaRotas]},
      { path: 'meus-dados', component: MeusDadosComponent, data: { title: 'Meus dados' }, canActivate:[GuardaRotas]},
      { path: 'ajuda-usuario', component: AjudaUsuarioComponent, data: { title: 'Ajuda' }, canActivate:[GuardaRotas]}
    ])
  ]
})
export class AppModule { }
