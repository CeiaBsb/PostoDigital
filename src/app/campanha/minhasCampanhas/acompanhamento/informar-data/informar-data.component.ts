import { RegistrarCampanhaService } from './../registrarCampanha.service';
import { Campanha } from './../../../campanha';
import { Component, OnInit, Input } from '@angular/core';
import { JanelaMestreComponent } from '../../../../janela-mestre/janela-mestre.component';
import { ActivatedRoute } from '@angular/router';
import { CampanhaService } from '../../../campanha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informar-data',
  templateUrl: './informar-data.component.html',
  styleUrls: ['./informar-data.component.css']
})
export class InformarDataComponent implements OnInit {

  carregando = true;

  constructor(
    private mestre: JanelaMestreComponent,
    private route: ActivatedRoute,
    private dataService: RegistrarCampanhaService,
    private campanhaService: CampanhaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataService.data = new Date();
    const id = this.route.snapshot.paramMap.get('id');
    this.carregarCampanha(id);
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

  prosseguir() {
    this.router.navigate(['listarFolhas']);
  }
} 
