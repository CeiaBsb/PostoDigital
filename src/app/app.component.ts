import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/authentication.service';
import { MinhasCampanhasComponent } from './campanha/minhasCampanhas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent {
  constructor(private auth: AuthenticationService) {
  
  }
}
