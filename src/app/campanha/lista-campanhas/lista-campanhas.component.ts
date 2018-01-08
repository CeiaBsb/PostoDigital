import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Campanha } from '../campanha';
import { CampanhaService } from '../campanha.service';
import { ModalProcessandoComponent } from '../../janela-mestre/modal-processando/modal-processando.component';
import { JanelaMestreComponent } from '../../janela-mestre/janela-mestre.component';
import {UtilService} from '../../util.service';

@Component({
  selector: 'app-lista-campanhas',
  templateUrl: './lista-campanhas.component.html',
  styleUrls: ['./lista-campanhas.component.css']
})
export class ListaCampanhasComponent implements OnInit {

  campanhas: Campanha[];
  visiveis: Campanha[];
  carregando = false;

  constructor(
    private campanhaService: CampanhaService,
    private router: Router, 
    private modalProcessando: ModalProcessandoComponent, 
    private mestre: JanelaMestreComponent,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.mestre.setTitle('Gerenciar Campanhas'); 
    this.listarCampanhas();
  } 

  atualizarVisiveis(parteNome: string) {
    this.visiveis = [];
    for ( let campanha of this.campanhas) {
      if ( this.util.normalize(campanha.nome).indexOf(this.util.normalize(parteNome)) >= 0) {
        this.visiveis.push(campanha);
      }
    }
  }

  listarCampanhas() {
    this.carregando = true;
    this.campanhaService.listarCampanhas('', '', '')
      .subscribe(        
        retorno => {
          this.campanhas = retorno.campanhas;
          this.atualizarVisiveis('');
          this.carregando = false;
        }
      );
  }

  adicionarCampanha() {
    this.modalProcessando.mostrarModal();
    this.campanhaService.adicionarCampanha()
      .subscribe(        
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type !== 'error') {
            this.router.navigate(['campanha/detalhar/' + retorno.campanha.id]);
          }
        }
      );
  }

}
