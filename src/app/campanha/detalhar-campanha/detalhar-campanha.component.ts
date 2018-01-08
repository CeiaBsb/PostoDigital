import { CampanhaService } from './../campanha.service';
import { Component, OnInit } from '@angular/core';
import { Campanha} from '../campanha';
import { ActivatedRoute } from '@angular/router';
import { ModalErroComponent } from '../../janela-mestre/modal-erro/modal-erro.component';
import {Router} from '@angular/router';
import {ConfigurationService} from '../../configuration.service';
import { ModalProcessandoComponent } from '../../janela-mestre/modal-processando/modal-processando.component';

@Component({
  selector: 'app-detalhar-campanha',
  templateUrl: './detalhar-campanha.component.html',
  styleUrls: ['./detalhar-campanha.component.css']
})
export class DetalharCampanhaComponent implements OnInit {

  campanha: Campanha = { id: 0, nome: '', status: ''};
  carregado = false;

  constructor
  (
    private campanhaService: CampanhaService, 
    private route: ActivatedRoute, 
    private modalErro: ModalErroComponent,
    private router: Router,
    private config: ConfigurationService, 
    private modalProcessando: ModalProcessandoComponent
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detalharCampanha(id);
  } 

  detalharCampanha(id: string) {
    this.carregado = false;
    this.campanhaService.detalharCampanha(id)
      .subscribe(        
        retorno => {
          this.campanha = retorno.campanha;
          this.carregado = true;
        }
      );
  }

  excluirCampanha() {
    this.modalProcessando.mostrarModal();
    this.campanhaService.excluirCampanha(String(this.campanha.id))
      .subscribe(        
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type === 'error') {
            this.modalErro.mostrarModal(retorno.msg);
          } else {
            this.router.navigate(['listaCampanhas']);
          }
        }
      );
  }

  atualizarCampanha() {
    this.modalProcessando.mostrarModal();
    this.campanhaService.atualizarCampanha(this.campanha)
      .subscribe(        
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type === 'error') {
            this.modalErro.mostrarModal(retorno.msg);
          } else {
            this.router.navigate(['listaCampanhas']);
          }
        }
      );
  }

  cancelar() {
    this.router.navigate(['listaCampanhas']);
  }

}
