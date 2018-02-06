import { ItensService } from './../itens.service';
import { UtilService } from './../../util.service';
import { FrequenciaService } from './../../frequencia/frequencia.service';
import { JanelaMestreComponent } from './../../janela-mestre/janela-mestre.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalProcessandoComponent } from './../../janela-mestre/modal-processando/modal-processando.component';
import { PessoaService } from './../../pessoa/pessoa.service';
import { ConfigurationService } from '../../configuration.service';
import { RegistrarCampanhaService } from '../../campanha/minhasCampanhas/acompanhamento/registrarCampanha.service';

@Component({
  selector: 'app-preencher-relacao',
  templateUrl: './preencher-relacao.component.html',
  styleUrls: ['./preencher-relacao.component.css']
})
export class PreencherRelacaoComponent implements OnInit {

  carregando = false;
  itens: ItemQuantificado[];
  itensAssoc: ItemQuantificado[];
  visiveis: ItemQuantificado[];
  filtro = '';

  constructor(
    private mestre: JanelaMestreComponent,
    private route: ActivatedRoute,
    private router: Router,
    private config: ConfigurationService,
    private modalProcessando: ModalProcessandoComponent,
    private dataService: RegistrarCampanhaService,
    private itensService: ItensService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.dataService.relacaoItensSelecionada = this.route.snapshot.paramMap.get('id');
    this.filtro = this.dataService.filtro;
    this.carregarItens();
  }

  carregarItens() {
    this.carregando = true;
    this.itensService.listarItensParaMarcacao(this.dataService.relacaoItensSelecionada, this.dataService.data)
      .subscribe(
      retorno => {
        this.itens = retorno.itens;
        this.itensAssoc = [];
        for (const item of retorno.itens) {
          this.itensAssoc[item.id] = item;
          item.quantidade = Math.round(item.quantidade * 100) / 100;
        }
        this.atualizarVisiveis(this.dataService.filtro);
        this.carregando = false;
      }
      );
  }

  editar(id: string) {
    this.router.navigate(['detalharPessoa/' + id + '/' + this.dataService.folhaFreqSelecionada]);
  }

  atualizarVisiveis(parteNome: string) {
    this.dataService.filtro = parteNome;
    this.visiveis = [];
    for (const item of this.itens) {
      if (this.util.normalize(item.nome).indexOf(this.util.normalize(parteNome)) >= 0) {
        this.visiveis.push(item);
      }
    }
  }

  subtrair(campo, idItem) {
    let valor = campo.value;
    if (valor === '') {
      valor = 1;
    }
    let quantidade = valor as number;
    quantidade = this.itensAssoc[idItem].quantidade - quantidade as number;
    quantidade = Math.round(quantidade * 100) / 100;
    this.itensAssoc[idItem].quantidade = quantidade;
    this.itensService.registrarQuantidade(idItem, this.dataService.data, quantidade).subscribe();
    campo.value = '';
  }

  somar(campo, idItem) {
    let valor = campo.value;
    if (valor === '') {
      valor = 1;
    }
    let quantidade: number = +valor;
    const param1: number = +this.itensAssoc[idItem].quantidade;
    const param2: number = +quantidade;
    quantidade = param1 + param2;
    quantidade = Math.round(quantidade * 100) / 100;
    this.itensAssoc[idItem].quantidade = quantidade;
    this.itensService.registrarQuantidade(idItem, this.dataService.data, quantidade).subscribe();
    campo.value = '';
  }
  
    adicionarItem() {
      this.modalProcessando.mostrarModal();
      this.itensService.adicionarItem(this.dataService.relacaoItensSelecionada)
        .subscribe(
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type !== 'error') {
            this.router.navigate(['detalharItem/' + retorno.item.id]);
          }
        }
        );
    }

    editarItem(idItem) {
      this.router.navigate(['detalharItem/' + idItem]);
    }
}

class ItemQuantificado {
  id: string;
  nome: string;
  quantidade: number;
}
