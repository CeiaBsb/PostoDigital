import { PtBrDateAdapter } from './../../../../ptBrDateAdapter';
import { RegistrarCampanhaService } from './../registrarCampanha.service';
import { Campanha } from './../../../campanha';
import { Component, OnInit, Input } from '@angular/core';
import { JanelaMestreComponent } from '../../../../janela-mestre/janela-mestre.component';
import { ActivatedRoute } from '@angular/router';
import { CampanhaService } from '../../../campanha.service';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../../../configuration.service';

@Component({
  selector: 'app-informar-data',
  templateUrl: './informar-data.component.html',
  styleUrls: ['./informar-data.component.css']
})
export class InformarDataComponent implements OnInit {

  carregando = true;
  carregandoAcompanhamentos = true;
  now = new Date();
  acompanhamentos: Date[];
  dateAdapter = new PtBrDateAdapter(this.config);

  constructor(
    private mestre: JanelaMestreComponent,
    private route: ActivatedRoute,
    private dataService: RegistrarCampanhaService,
    private campanhaService: CampanhaService,
    private router: Router,
    private config: ConfigurationService
  ) { }

  ngOnInit() {
    this.dataService.data = new Date();
    const id = this.route.snapshot.paramMap.get('id');
    this.carregarCampanha(id);
    this.carregarAcompanhamentos(id);
  }

  carregarCampanha(id: string) {
    this.campanhaService.detalharCampanha(id)
      .subscribe(
      retorno => {
        this.dataService.campanha = retorno.campanha;
        this.mestre.setTitle(this.dataService.campanha.nome);
        this.carregando = false;
      }
      );
  }

  carregarAcompanhamentos(id: string) {
    this.campanhaService.carregarAcompanhamentos(id)
      .subscribe(
      retorno => {
        this.acompanhamentos = retorno.datas;
        this.carregandoAcompanhamentos = false;
      }
      );
  }

  prosseguir() {
    this.router.navigate(['listarFolhas']);
  }
} 
