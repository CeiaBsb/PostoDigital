import { Component, OnInit } from '@angular/core';
import { JanelaMestreComponent } from '../../../../janela-mestre/janela-mestre.component';

@Component({
  selector: 'app-informar-data',
  templateUrl: './informar-data.component.html',
  styleUrls: ['./informar-data.component.css']
}) 
export class InformarDataComponent implements OnInit {

  data: Date;

  constructor(
    private mestre: JanelaMestreComponent
  ) { }

  ngOnInit() {
    this.mestre.setTitle('Selecionar Data'); 
    this.data = new Date();
  }

} 
