import { Component, OnInit } from '@angular/core';
import { Campanha } from '../campanha';
import { CampanhaService } from '../campanha.service';
import { JanelaMestreComponent } from '../../janela-mestre/janela-mestre.component';

@Component({
  selector: 'app-minhas-campanhas',
  templateUrl: './minhasCampanhas.component.html', 
  styleUrls: ['./minhasCampanhas.component.css']
})  
export class MinhasCampanhasComponent implements OnInit {

  minhasCampanhas: Campanha[] = [];
  carregando = false;

  constructor(private campanhaService: CampanhaService, private mestre: JanelaMestreComponent) { }

  ngOnInit() {
    this.mestre.setTitle('Minhas Campanhas'); 
    this.listarMinhasCampanhas();
  }
  
  listarMinhasCampanhas() {
    this.carregando = true;
    this.campanhaService.listarMinhasCampanhas()
      .subscribe(        
        retorno => {
          this.minhasCampanhas = retorno.campanhas;
          this.carregando = false;
        }
      );
  }

}
