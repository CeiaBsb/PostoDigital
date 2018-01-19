import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogoutComponent } from '../login/logout.component';
import { MinhasCampanhasComponent } from '../campanha/minhasCampanhas/minhasCampanhas.component';
import { InformarDataComponent } from '../campanha/minhasCampanhas/acompanhamento/informar-data/informar-data.component';
import { DetalharCampanhaComponent } from '../campanha/detalhar-campanha/detalhar-campanha.component';
import { ListaCampanhasComponent } from '../campanha/lista-campanhas/lista-campanhas.component';
import { ModalProcessandoComponent } from './modal-processando/modal-processando.component';
import { ModalErroComponent } from './modal-erro/modal-erro.component';
import {ListaUsuariosComponent} from '../usuario/lista-usuarios/lista-usuarios.component';
import {ListaPessoasComponent} from '../pessoa/lista-pessoas/lista-pessoas.component';
import { DetalharUsuarioComponent } from './../usuario/detalhar-usuario/detalhar-usuario.component';
import { DetalharPessoaComponent } from '../pessoa/detalhar-pessoa/detalhar-pessoa.component';

const routes: Routes = [
  {path: 'minhasCampanhas', component: MinhasCampanhasComponent },
  {path: 'logout', component: LogoutComponent },
  {path: 'listaCampanhas', component: ListaCampanhasComponent },
  {path: 'detalharCampanha/:id', component: DetalharCampanhaComponent },
  {path: 'listaUsuarios', component: ListaUsuariosComponent },
  {path: 'listaPessoas', component: ListaPessoasComponent },
  {path: 'detalharUsuario/:id', component: DetalharUsuarioComponent },
  {path: 'detalharPessoa/:id', component: DetalharPessoaComponent },
  {path: 'dataDaCampanha/:id', component: InformarDataComponent },
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
