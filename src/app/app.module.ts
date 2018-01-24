import { PtBrDateAdapter } from './ptBrDateAdapter';
import { ModalFotoComponent } from './campanha/minhasCampanhas/acompanhamento/modal-foto/modal-foto.component';
import { FrequenciaService } from './frequencia/frequencia.service';
import { ListarFolhasComponent } from './campanha/minhasCampanhas/acompanhamento/listar-folhas/listar-folhas.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { JanelaMestreModule } from './janela-mestre/janela-mestre.module';

import { AppComponent } from './app.component'; 
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { MinhasCampanhasComponent } from './campanha/minhasCampanhas/minhasCampanhas.component';
import { InformarDataComponent } from './campanha/minhasCampanhas/acompanhamento/informar-data/informar-data.component';
import { ListaCampanhasComponent } from './campanha/lista-campanhas/lista-campanhas.component';
import { DetalharCampanhaComponent } from './campanha/detalhar-campanha/detalhar-campanha.component';
import {ListaUsuariosComponent} from './usuario/lista-usuarios/lista-usuarios.component';
import {ListaPessoasComponent} from './pessoa/lista-pessoas/lista-pessoas.component';
import { DetalharUsuarioComponent } from './usuario/detalhar-usuario/detalhar-usuario.component';
import { DetalharPessoaComponent } from './pessoa/detalhar-pessoa/detalhar-pessoa.component';
import { AuthenticationService } from './login/authentication.service';
import { CampanhaService } from './campanha/campanha.service';
import {ConfigurationService} from './configuration.service';
import {UtilService} from './util.service';
import { UsuarioService } from './usuario/usuario.service';
import { PessoaService } from './pessoa/pessoa.service';
import { DOCUMENT } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './login/JwtInterceptor';
import { RegistrarCampanhaService } from './campanha/minhasCampanhas/acompanhamento/registrarCampanha.service';
import { MarcarFrequenciaComponent } from './campanha/minhasCampanhas/acompanhamento/marcar-frequencia/marcar-frequencia.component';
import { IniciarAcompanhamentoComponent } from './campanha/minhasCampanhas/acompanhamento/iniciar-acompanhamento.component';
import { LimitStringPipe } from './limit-string.pipe';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MinhasCampanhasComponent,
    ListaCampanhasComponent,
    DetalharCampanhaComponent, 
    ListaUsuariosComponent,
    DetalharUsuarioComponent,
    ListaPessoasComponent,
    DetalharPessoaComponent,
    InformarDataComponent,
    LogoutComponent,
    ListarFolhasComponent, 
    MarcarFrequenciaComponent,
    IniciarAcompanhamentoComponent,
    ModalFotoComponent,
    LimitStringPipe
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    JanelaMestreModule,
    RouterModule
  ],
  providers: [
    AuthenticationService,
    CampanhaService,
    ConfigurationService,
    UsuarioService,
    PessoaService,
    UtilService,
    RegistrarCampanhaService,
    FrequenciaService,
    ModalFotoComponent,
    Document,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }, 
    { 
      provide: DateAdapter, 
      useClass: PtBrDateAdapter, 
      deps: [MAT_DATE_LOCALE] 
    }
  ],
  entryComponents: [
    ModalFotoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
