import { JanelaMestreComponent } from './../../../janela-mestre/janela-mestre.component';
import { RegistrarCampanhaService } from './registrarCampanha.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-acompanhamento',
  templateUrl: '../minhasCampanhas.component.html', 
  styleUrls: ['../minhasCampanhas.component.css']
}) 
export class IniciarAcompanhamentoComponent implements OnInit {

  carregando = false;

  constructor(
    private mestre: JanelaMestreComponent,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: RegistrarCampanhaService
  ) { }
 
  ngOnInit() {
    this.mestre.setTitle('Campanha');

    this.dataService.campanha = null;
    this.dataService.data = null;
    this.dataService.folhaFreqSelecionada = null;

    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['informarData/' + id]);
  }


}
