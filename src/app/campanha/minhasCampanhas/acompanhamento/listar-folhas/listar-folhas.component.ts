import { Item } from './../../../../itens/item';
import { FrequenciaService } from './../../../../frequencia/frequencia.service';
import { RegistrarCampanhaService } from './../registrarCampanha.service';
import { JanelaMestreComponent } from './../../../../janela-mestre/janela-mestre.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ItensService } from '../../../../itens/itens.service'; 

@Component({
  selector: 'app-listar-folhas',
  templateUrl: './listar-folhas.component.html',
  styleUrls: ['./listar-folhas.component.css']
})
export class ListarFolhasComponent implements OnInit {

  carregando = false;
  carregandoItens = false;

  folhas = [];
  resumoRelacaoItens = [];

  frequencia: Folha[];
  itens: Item[];

  constructor(
    private mestre: JanelaMestreComponent,
    private route: ActivatedRoute,
    private dataService: RegistrarCampanhaService,
    private frequenciaService: FrequenciaService,
    private itensService: ItensService
  ) { }
  
  ngOnInit() {
    const datePipe = new DatePipe('en');
    this.mestre.setTitle('(' + datePipe.transform(this.dataService.data, 'dd/MM/yyyy') + ') ' + this.dataService.campanha.nome);
    this.carregarFolhas();
    this.carregarItens();
  }

  carregarFolhas() {
    this.carregando = true;
    this.frequenciaService.listarFolhas(this.dataService.campanha.id)
      .subscribe(        
        retorno => {
          this.frequencia = retorno.listasFrequencia;
          this.carregando = false;

          for (const folha of retorno.listasFrequencia) {
            this.resumirFolhaNaData(folha.id);
          }
        }
      );
  }

  carregarItens() {
    this.carregandoItens = true;
    this.itensService.listarRelacoes(this.dataService.campanha.id)
      .subscribe(        
        retorno => {
          this.itens = retorno.listasItens;
          this.carregandoItens = false;

          for (const item of retorno.listasItens) {
            this.resumirRelacaoItensNaData(item.id);
          }
        }
      );
  }

  resumirFolhaNaData(idFolha) {
    this.frequenciaService.resumirFolhaNaData(idFolha, this.dataService.data)
      .subscribe(        
        retorno => {
          this.folhas[idFolha] = retorno.presentes + '/' + retorno.pessoas;
        }
      );
  }

  resumirRelacaoItensNaData(idRelacaoItens) {
    this.itensService.resumirItensNaData(idRelacaoItens, this.dataService.data)
      .subscribe(        
        retorno => {
          let valor = +retorno.contados;
          valor = Math.round(valor * 100) / 100;
          this.resumoRelacaoItens[idRelacaoItens] = valor + ' contados dos ' + retorno.total + ' itens';
        }
      );
  }

}

class Folha {
  id: string;
  nome: string;
}

