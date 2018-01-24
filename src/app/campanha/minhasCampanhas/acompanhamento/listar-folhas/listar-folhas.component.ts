import { FrequenciaService } from './../../../../frequencia/frequencia.service';
import { RegistrarCampanhaService } from './../registrarCampanha.service';
import { JanelaMestreComponent } from './../../../../janela-mestre/janela-mestre.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar-folhas',
  templateUrl: './listar-folhas.component.html',
  styleUrls: ['./listar-folhas.component.css']
})
export class ListarFolhasComponent implements OnInit {

  carregando = false;

  constructor(
    private mestre: JanelaMestreComponent,
    private route: ActivatedRoute,
    private dataService: RegistrarCampanhaService,
    private frequenciaService: FrequenciaService
  ) { }
  
  ngOnInit() {
    const datePipe = new DatePipe('en');
    this.mestre.setTitle('(' + datePipe.transform(this.dataService.data, 'dd/MM/yyyy') + ') ' + this.dataService.campanha.nome);
    this.carregarFolhas();
  }

  carregarFolhas() {
    this.carregando = true;
    this.frequenciaService.listarFolhas(this.dataService.campanha.id)
      .subscribe(        
        retorno => {
          this.dataService.frequencia = retorno.listasFrequencia;
          this.carregando = false;
        }
      );
  }

}
