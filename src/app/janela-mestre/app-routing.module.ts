import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MinhasCampanhasComponent } from '../campanha/minhasCampanhas.component';
import { DetalharCampanhaComponent } from '../campanha/detalhar-campanha/detalhar-campanha.component';
import { ListaCampanhasComponent } from '../campanha/lista-campanhas/lista-campanhas.component';
import { ModalProcessandoComponent } from './modal-processando/modal-processando.component';
import { ModalErroComponent } from './modal-erro/modal-erro.component';
import {ListaUsuariosComponent} from '../usuario/lista-usuarios/lista-usuarios.component';
import { DetalharUsuarioComponent } from './../usuario/detalhar-usuario/detalhar-usuario.component';

const routes: Routes = [
  {path: 'minhasCampanhas', component: MinhasCampanhasComponent },
  {path: 'listaCampanhas', component: ListaCampanhasComponent },
  {path: 'detalharCampanha/:id', component: DetalharCampanhaComponent },
  {path: 'listaUsuarios', component: ListaUsuariosComponent },
  {path: 'detalharUsuario/:id', component: DetalharUsuarioComponent },
  {path: '', redirectTo: '/minhasCampanhas', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [
    RouterModule
  ]
})
  
export class AppRoutingModule { }
