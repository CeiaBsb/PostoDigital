import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { ConfigurationService } from '../configuration.service';
import { UtilService } from '../util.service';

@Injectable()
export class AuthenticationService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  token = '';
  loggedUser: User = { perfil: '', nome: '' };

  constructor(
    private http: HttpClient,
    private config: ConfigurationService
  ) { }

  login(user: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { user: user, password: password };
    return this.http.post<LoginResponse>(this.config.apiUrl + '/login', loginRequest, this.httpOptions)
      .pipe(
      tap(
        response => {
          this.token = response.token;
          this.loggedUser.perfil = response.perfil;
          this.loggedUser.nome = response.nome;
          if (response.type === 'error') {
            console.log(response.msg);
          }
        }
      ),
      catchError(UtilService.handleError<LoginResponse>({
        type: 'error', msg: 'Erro de conexão com a API.',
        token: '', perfil: '', nome: ''
      }))
      );
  }

  logout() {
    this.token = '';
  }

  isLogged() {
    return this.token !== '';
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'jwt': this.token })
    };
  }

  getToken() {
    return this.token;
  }

  checarPerfil(perfil: string): boolean {
    if (this.loggedUser.perfil === '') {
      return false;
    }
    if (perfil === 'any') {
      return true;
    }
    if (this.loggedUser.perfil === 'administrador') {
      return true;
    }
    if (perfil === this.loggedUser.perfil) {
      return true;
    }
    return false;
  }

}

class LoginRequest {
  user: string;
  password: string;
}

class LoginResponse {
  type: string;
  msg: string;
  token: string;
  perfil: string;
  nome: string;
}

class User {
  perfil: string;
  nome: string;
}