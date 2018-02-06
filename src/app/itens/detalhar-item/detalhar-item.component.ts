import { RegistrarCampanhaService } from './../../campanha/minhasCampanhas/acompanhamento/registrarCampanha.service';
import { Item } from './../item';
import { ItensService } from './../itens.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalErroComponent } from '../../janela-mestre/modal-erro/modal-erro.component';
import {Router} from '@angular/router';
import {ConfigurationService} from '../../configuration.service';
import { ModalProcessandoComponent } from '../../janela-mestre/modal-processando/modal-processando.component';

@Component({
  selector: 'app-detalhar-item',
  templateUrl: './detalhar-item.component.html',
  styleUrls: ['./detalhar-item.component.css']
})
export class DetalharItemComponent implements OnInit {

  item: Item = { id: 0, nome: ''};
  carregado = false;

  constructor
  (
    private itensService: ItensService, 
    private route: ActivatedRoute, 
    private modalErro: ModalErroComponent,
    private router: Router,
    private dataService: RegistrarCampanhaService,
    private config: ConfigurationService, 
    private modalProcessando: ModalProcessandoComponent
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detalharItem(id);
  } 

  detalharItem(id: string) {
    this.carregado = false;
    this.itensService.detalharItem(id)
      .subscribe(        
        retorno => {
          this.item = retorno.item; 
          this.carregado = true;
        }
      );
  }

  excluirItem() {
    this.modalProcessando.mostrarModal();
    this.itensService.excluirItem(String(this.item.id))
      .subscribe(        
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type === 'error') {
            this.modalErro.mostrarModal(retorno.msg);
          } else {
            this.router.navigate(['preencherRelacao/' + this.dataService.relacaoItensSelecionada]);
          }
        }
      );
  }

  atualizarItem() {
    this.modalProcessando.mostrarModal();
    this.itensService.atualizarItem(this.item)
      .subscribe(        
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type === 'error') {
            this.modalErro.mostrarModal(retorno.msg);
          } else {
            this.router.navigate(['preencherRelacao/' + this.dataService.relacaoItensSelecionada]);
          }
        }
      );
  }

  cancelar() {
    this.router.navigate(['preencherRelacao/' + this.dataService.relacaoItensSelecionada]);
  }

}
