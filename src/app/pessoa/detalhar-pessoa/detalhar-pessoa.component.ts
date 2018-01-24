import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { ActivatedRoute } from '@angular/router';
import { ModalErroComponent } from '../../janela-mestre/modal-erro/modal-erro.component';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../configuration.service';
import { ModalProcessandoComponent } from '../../janela-mestre/modal-processando/modal-processando.component';

@Component({
  selector: 'app-detalhar-pessoa',
  templateUrl: './detalhar-pessoa.component.html',
  styleUrls: ['./detalhar-pessoa.component.css']
})
export class DetalharPessoaComponent implements OnInit {

  pessoa: Pessoa = { id: 0, nome: '', dt_nascimento: new Date(), nome_mae: '', atualizado: false, tem_foto: '' };
  carregado = false;
  confirmarSenha: string;
  folhasRelacionadas: any;
  idFrequenciaBack: string;
 
  constructor
    (
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private modalErro: ModalErroComponent,
    private router: Router,
    private config: ConfigurationService,
    private modalProcessando: ModalProcessandoComponent
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.idFrequenciaBack = this.route.snapshot.paramMap.get('freqId');
    this.detalharPessoa(id);
    this.listarFolhas(id);
  }

  detalharPessoa(id: string) {
    this.carregado = false;
    this.pessoaService.detalharPessoa(id)
      .subscribe(
      retorno => {
        this.pessoa = retorno.pessoa;
        this.carregado = true;
      }
      );
  }

  upload(fileInput) {
    const files = fileInput.files;
    if (files.length === 0) {
      console.log('Nenhum arquivo selecionado');
      return;
    }

    const file: File = files[0];
    this.pessoaService.uploadFile(file, String(this.pessoa.id))
      .subscribe(
      retorno => {
        if (retorno.type === 'success') {
          this.pessoa.tem_foto = 'true';
        } else if (retorno.type === 'error') {
          this.modalErro.mostrarModal('Falha ao enviar a foto. Tente com uma imagem menor.');
        }
      }
      );
  }
  
    listarFolhas(id: string) {
      this.pessoaService.listarFolhasPresenca(id)
        .subscribe(        
          retorno => {
            this.folhasRelacionadas = retorno.folhas;
          }
        );
    }
  
    atualizarFolhas(id: number) {
      this.pessoaService.atualizarFolhasPresenca(String(id), this.folhasRelacionadas)
        .subscribe(        
          retorno => {
          }
        );
    } 

  excluirPessoa() {
    this.modalProcessando.mostrarModal();
    this.pessoaService.excluirPessoa(String(this.pessoa.id))
      .subscribe(
      retorno => {
        this.modalProcessando.fecharModal();
        if (retorno.type === 'error') {
          this.modalErro.mostrarModal(retorno.msg);
        } else {
          if (this.idFrequenciaBack == null) {
            this.router.navigate(['listaPessoas']);
          } else {
            this.router.navigate(['preencherFrequencia/' + this.idFrequenciaBack]);
          }
        }
      }
      );
  }

  atualizarPessoa() {
    this.modalProcessando.mostrarModal();
    this.atualizarFolhas(this.pessoa.id);
    this.pessoaService.atualizarPessoa(this.pessoa)
      .subscribe(
      retorno => {
        this.modalProcessando.fecharModal();
        if (retorno.type === 'error') {
          this.modalErro.mostrarModal(retorno.msg);
        } else {
          if (this.idFrequenciaBack == null) {
            this.router.navigate(['listaPessoas']);
          } else {
            this.router.navigate(['preencherFrequencia/' + this.idFrequenciaBack]);
          }
        }
      }
      );
  }

  cancelar() {
    if (this.idFrequenciaBack == null) {
      this.router.navigate(['listaPessoas']);
    } else {
      this.router.navigate(['preencherFrequencia/' + this.idFrequenciaBack]);
    }
  }

}
