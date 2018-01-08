import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { JanelaMestreModule } from './janela-mestre/janela-mestre.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MinhasCampanhasComponent } from './campanha/minhasCampanhas.component';
import { ListaCampanhasComponent } from './campanha/lista-campanhas/lista-campanhas.component';
import { DetalharCampanhaComponent } from './campanha/detalhar-campanha/detalhar-campanha.component';
import {ListaUsuariosComponent} from './usuario/lista-usuarios/lista-usuarios.component';
import { DetalharUsuarioComponent } from './usuario/detalhar-usuario/detalhar-usuario.component';

import { AuthenticationService } from './login/authentication.service';
import { CampanhaService } from './campanha/campanha.service';
import {ConfigurationService} from './configuration.service';
import {UtilService} from './util.service';
import { UsuarioService } from './usuario/usuario.service';
import { DOCUMENT } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MinhasCampanhasComponent,
    ListaCampanhasComponent,
    DetalharCampanhaComponent, 
    ListaUsuariosComponent,
    DetalharUsuarioComponent
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
    UtilService,
    Document
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
