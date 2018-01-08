import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class AuthenticationService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  token = '';

  constructor(
    private http: HttpClient,
    private config: ConfigurationService
  ) { }

  login(user: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {user: user, password: password};
    return this.http.post<LoginResponse>(this.config.apiUrl + '/login', loginRequest, this.httpOptions)
      .pipe(
        tap(
          response => {
            this.token = response.token;
            if (response.type === 'error') {
              console.log(response.msg);
            } 
          }
        ),
        catchError( this.handleError<LoginResponse>('login', {type: 'error', msg: '', token: ''} ) )
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
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // mostra o erro no console do browser
      console.error(error); 
   
      // retorna o resultado alternativo
      return of (result as T);
    };
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
}
