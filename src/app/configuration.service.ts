import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class ConfigurationService {

    apiUrl = '';
    baseUrl = '';
    apiBaseUrl = '';
    permiteRefresh = false;

    /* o datePicker do angular tem um problema relacionado ao fuso horário que pode ser corrigido com esse parâmetro.
     Adicione o número de horas que estiver dando diferença. */ 
    hourAdjust = 0;

    constructor(
        private document: Document
    ) {
        // ambiente de desenvolvimento
        if (this.document.baseURI.indexOf('http://localhost:4200/') === 0) {

            this.apiUrl = 'http://127.0.0.1/scripts/ceiaApi/api.php';
            this.apiBaseUrl = 'http://127.0.0.1/scripts/ceiaApi';
            this.baseUrl = 'http://localhost:4200';
            this.hourAdjust = 24;
            this.permiteRefresh = true;
        } else 
        // ambiente de homologacao
        if (this.document.baseURI.indexOf('http://ceia.eu3.org') === 0) {

            this.apiUrl = 'http://ceia.eu3.org/api/api.php';
            this.apiBaseUrl = 'http://ceia.eu3.org/api';
            this.baseUrl = 'http://ceia.eu3.org';
            this.hourAdjust = 24;
            this.permiteRefresh = false;
        }
    }

}
