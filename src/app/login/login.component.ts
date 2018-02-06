import { ConfigurationService } from './../configuration.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

import { ModalProcessandoComponent } from '../janela-mestre/modal-processando/modal-processando.component';
import { ModalErroComponent } from '../janela-mestre/modal-erro/modal-erro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private modalProcessando: ModalProcessandoComponent,
    private modalErro: ModalErroComponent,
    private config: ConfigurationService
  ) { }

  ngOnInit() {
  }

  login() {
    this.modalProcessando.mostrarModal();
    this.auth.login(this.user, this.password)
      .subscribe(
      retorno => {
        if (retorno.type !== 'error') {
          this.user = '';
          if (!this.config.permiteRefresh) {
            window.addEventListener('beforeunload', function (e) {
              const confirmationMessage = '\o/';
              e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
              return confirmationMessage;              // Gecko, WebKit, Chrome <34
            });
          }
        } else {
          this.modalErro.mostrarModal(retorno.msg);
        }
        this.password = '';
        this.router.navigate(['.']);
        this.modalProcessando.fecharModal();
      }
      );
  }
}
