import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogoutComponent implements OnInit {

  user: string;
  password: string;
  
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.logout();
    this.router.navigate(['minhasCampanhas/']);
  }

}
