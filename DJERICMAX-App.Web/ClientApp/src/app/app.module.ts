import { ServicosService } from './services/servicos/servicos.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/layout/nav-menu/nav-menu.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ServicosComponent } from './components/pages/servicos/servicos.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { GuardaRotas } from './autorizer/guardarotas';
import { UsuarioService } from './services/usuario/usuario.service';
import { GaleriaComponent } from './components/pages/galeria/galeria.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { FaqsComponent } from './components/pages/faqs/faqs.component';
import { ContatoComponent } from './components/pages/contato/contato.component';
import { CadastroUsuarioComponent } from './components/auth/cadastro-usuario/cadastro-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ServicosComponent,
    LoginComponent,
    FooterComponent,
    GaleriaComponent,
    PortfolioComponent,
    FaqsComponent,
    ContatoComponent,
    CadastroUsuarioComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'galeria', component: GaleriaComponent, canActivate:[GuardaRotas] },
      { path: 'servicos', component: ServicosComponent, canActivate:[GuardaRotas] },
      { path: 'faqs', component: FaqsComponent },
      { path: 'portfolio', component: PortfolioComponent, canActivate:[GuardaRotas] },
      { path: 'contato', component: ContatoComponent},
      { path: 'entrar', component: LoginComponent  }
    ])
  ],
  providers: [
    UsuarioService,
    ServicosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
