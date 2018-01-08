import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

import { Campanha } from '../campanha/campanha';

import { CampanhaService } from '../campanha/campanha.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-janela-mestre',
  templateUrl: './janela-mestre.component.html',
  styleUrls: ['./janela-mestre.component.css']
})
export class JanelaMestreComponent implements OnInit, OnDestroy {

  minhasCampanhas: Campanha[] = [];
  mobileQuery: MediaQueryList;
  title = '';

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private campanhaService: CampanhaService,
    private auth: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  ngOnInit(): void {
    this.listarMinhasCampanhas();
  }
  
  setTitle(title: string) {
    this.title = title;  
  }
  
  listarMinhasCampanhas() {
    this.campanhaService.listarMinhasCampanhas()
      .subscribe(        
        retorno => {
          this.minhasCampanhas = retorno.campanhas;
        }
      );
  }

}

