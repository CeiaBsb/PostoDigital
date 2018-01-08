import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class ConfigurationService {

    apiUrl = '';
    baseUrl = '';

    constructor(
        private document: Document
    ) {
        // ambiente de desenvolvimento
        if (this.document.baseURI.indexOf('http://localhost:4200/') === 0) {

            this.apiUrl = 'http://127.0.0.1/scripts/ceiaApi/api.php';
            this.baseUrl = 'http://localhost:4200';
        } else 
        // ambiente de homologacao
        if (this.document.baseURI.indexOf('http://ceia.eu3.org') === 0) {

            this.apiUrl = 'http://ceia.eu3.org/api/api.php';
            this.baseUrl = 'http://ceia.eu3.org';
        }
    }

}
