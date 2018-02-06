import { UtilService } from './../../../../util.service';
import { FrequenciaService } from './../../../../frequencia/frequencia.service';
import { CampanhaService } from './../../../campanha.service';
import { RegistrarCampanhaService } from './../registrarCampanha.service';
import { JanelaMestreComponent } from './../../../../janela-mestre/janela-mestre.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../../../configuration.service';
import { ModalFotoComponent } from '../modal-foto/modal-foto.component';
import { ModalProcessandoComponent } from '../../../../janela-mestre/modal-processando/modal-processando.component';
import { PessoaService } from '../../../../pessoa/pessoa.service';

@Component({
  selector: 'app-marcar-frequencia',
  templateUrl: './marcar-frequencia.component.html',
  styleUrls: ['./marcar-frequencia.component.css']
})
export class MarcarFrequenciaComponent implements OnInit {

  carregando = false;
  visiveis: PessoaPresenca[];
  filtro = '';
  pessoas: PessoaPresenca[];

  constructor(
    private pessoaService: PessoaService,
    private mestre: JanelaMestreComponent,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: RegistrarCampanhaService,
    private campanhaService: CampanhaService,
    private frequenciaService: FrequenciaService,
    private config: ConfigurationService,
    private modalProcessando: ModalProcessandoComponent,
    private modal: ModalFotoComponent,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.dataService.folhaFreqSelecionada = this.route.snapshot.paramMap.get('id');
    this.filtro = this.dataService.filtro;
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.carregando = true;
    this.frequenciaService.listarPessoasParaFrequencia(this.dataService.folhaFreqSelecionada, this.dataService.data)
      .subscribe(
      retorno => {
        this.pessoas = retorno.pessoas;
        this.atualizarVisiveis(this.dataService.filtro);
        this.carregando = false;
      }
      );
  }

  calcularIdade(nascimento: Date) {
    if (nascimento === null) {
      return 'idade desconhecida';
    }
    if (String(nascimento) === '0000-00-00') {
      return 'idade desconhecida';
    }
    
    if (!(nascimento instanceof Date)) {
      nascimento = new Date(nascimento);
    }
    const now = new Date();
    const ageTime = now.getTime() - nascimento.getTime();
    const age = Math.floor(ageTime / (60 * 60 * 24 * 365 * 1000));
    if (age === 1) {
      return '1 ano';
    } else {
      return age + ' anos';
    }

  }

  marcarPresenca(idPessoa: string, presenca: boolean) {
    this.frequenciaService.marcarPresenca(idPessoa, this.dataService.folhaFreqSelecionada, this.dataService.data, presenca)
      .subscribe();
  }

  showModal(idPessoa: string, nomePessoa: string) {
    this.modal.mostrarModal(idPessoa, nomePessoa);
  }

  editar(id: string) {
    this.router.navigate(['detalharPessoa/' + id + '/' + this.dataService.folhaFreqSelecionada]);
  }

  atualizarVisiveis(parteNome: string) {
    this.dataService.filtro = parteNome;
    this.visiveis = []; 
    for (const pessoa of this.pessoas) {
      if (this.util.normalize(pessoa.nome).indexOf(this.util.normalize(parteNome)) >= 0) {
        this.visiveis.push(pessoa);
      }
    }
  }

  adicionarPessoa() {
    this.modalProcessando.mostrarModal();
    this.pessoaService.adicionarPessoa()
      .subscribe(
      retorno => {
        const folhas: FolhaRelacionada[] = [{ id: this.dataService.folhaFreqSelecionada, relacionado: true, nome: '', campanha: '' }];
        this.pessoaService.atualizarFolhasPresenca(String(retorno.pessoa.id), folhas)
          .subscribe(
          retorno2 => {
            this.modalProcessando.fecharModal();
            if (retorno.type !== 'error') {
              this.router.navigate(['detalharPessoa/' + retorno.pessoa.id + '/' + this.dataService.folhaFreqSelecionada]);
            }
          }
          );
      }
      );
  }
}

class PessoaPresenca {
  id: number;
  nome: string;
  dt_nascimento: Date;
  atualizado: string;
  tem_foto: string;
  presente: boolean;
}
class FolhaRelacionada {
  id: string;
  nome: string;
  campanha: string;
  relacionado: boolean;
}
