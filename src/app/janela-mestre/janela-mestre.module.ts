import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JanelaMestreComponent } from './janela-mestre.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { ModalProcessandoComponent } from './modal-processando/modal-processando.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalErroComponent } from './modal-erro/modal-erro.component';
import { ModalConfimacaoComponent } from './modal-confimacao/modal-confimacao.component';

@NgModule({
  imports: [
    CommonModule,    
    AppRoutingModule,
    MaterialModule,
    MatProgressSpinnerModule
  ],
  exports: [
    JanelaMestreComponent
  ],
  providers: [
    ModalProcessandoComponent,
    ModalErroComponent, 
    ModalConfimacaoComponent
  ],
  declarations: [
    JanelaMestreComponent,
    ModalProcessandoComponent,
    ModalErroComponent, 
    ModalConfimacaoComponent
  ],
  entryComponents: [
    ModalProcessandoComponent,
    ModalErroComponent, 
    ModalConfimacaoComponent
  ],
})
export class JanelaMestreModule { }
