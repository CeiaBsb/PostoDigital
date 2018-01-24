import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalProcessandoComponent } from '../../janela-mestre/modal-processando/modal-processando.component';
import { JanelaMestreComponent } from '../../janela-mestre/janela-mestre.component';
import { UtilService } from '../../util.service';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit {

  pessoas: Pessoa[];
  visiveis: Pessoa[]; 
  carregando = false;

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private modalProcessando: ModalProcessandoComponent,
    private mestre: JanelaMestreComponent,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.mestre.setTitle('Gerenciar Pessoas');
    this.listarPessoas();
  }

  atualizarVisiveis(parteNome: string) {
    this.visiveis = [];
    for (const pessoa of this.pessoas) {
      if (this.util.normalize(pessoa.nome).indexOf(this.util.normalize(parteNome)) >= 0) {
        this.visiveis.push(pessoa);
      }
    }
  }

  listarPessoas() {
    this.carregando = true;
    this.pessoaService.listarPessoas('', '', '', '', '')
      .subscribe(
      retorno => {
        this.pessoas = retorno.pessoas;
        this.atualizarVisiveis('');
        this.carregando = false;
      }
      );
  }
  
    adicionarPessoa() {
      this.modalProcessando.mostrarModal();
      this.pessoaService.adicionarPessoa()
        .subscribe(
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type !== 'error') {
            this.router.navigate(['detalharPessoa/' + retorno.pessoa.id]);
          }
        }
        );
    }

}
