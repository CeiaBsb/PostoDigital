import { DetalharItemComponent } from './../itens/detalhar-item/detalhar-item.component';
import { ListarFolhasComponent } from './../campanha/minhasCampanhas/acompanhamento/listar-folhas/listar-folhas.component';
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
import { MarcarFrequenciaComponent } from '../campanha/minhasCampanhas/acompanhamento/marcar-frequencia/marcar-frequencia.component';
import { IniciarAcompanhamentoComponent } from '../campanha/minhasCampanhas/acompanhamento/iniciar-acompanhamento.component';
import { ModalConfimacaoComponent } from './modal-confimacao/modal-confimacao.component';
import { PreencherRelacaoComponent } from '../itens/preencher-relacao/preencher-relacao.component';

const routes: Routes = [
  {path: 'minhasCampanhas', component: MinhasCampanhasComponent },
  {path: 'logout', component: LogoutComponent },
  {path: 'listaCampanhas', component: ListaCampanhasComponent },
  {path: 'detalharCampanha/:id', component: DetalharCampanhaComponent },
  {path: 'listaUsuarios', component: ListaUsuariosComponent },
  {path: 'listaPessoas', component: ListaPessoasComponent },
  {path: 'detalharUsuario/:id', component: DetalharUsuarioComponent },
  {path: 'detalharPessoa/:id', component: DetalharPessoaComponent },
  {path: 'detalharItem/:id', component: DetalharItemComponent },
  {path: 'detalharPessoa/:id/:freqId', component: DetalharPessoaComponent },
  {path: 'informarData/:id', component: InformarDataComponent },
  {path: 'listarFolhas', component: ListarFolhasComponent },
  {path: 'iniciarAcompanhamento/:id', component: IniciarAcompanhamentoComponent },
  {path: 'preencherFrequencia/:id', component: MarcarFrequenciaComponent },
  {path: 'preencherRelacao/:id', component: PreencherRelacaoComponent
 },
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
