import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Campanha } from './campanha';
import { AuthenticationService } from '../login/authentication.service';
import {ConfigurationService} from '../configuration.service';

@Injectable()
export class CampanhaService {
  
  constructor(
    private http: HttpClient, 
    private auth: AuthenticationService,
    private config: ConfigurationService
  ) { }
  
  listarMinhasCampanhas(): Observable<ListarCampanhasResponse> {
    return this.http.get<ListarCampanhasResponse>(this.config.apiUrl + '/campanha/listarMinhas', 
       this.auth.getHttpOptions())
      .pipe(
        tap(
          response => {
            if (response.type === 'error') {
              console.log(response.msg);
            } 
          }
        ),
        catchError( this.handleError<ListarCampanhasResponse>('listarMinhasCampanhas', {type: 'error', msg: '', campanhas: []} ) )
      );
  }

  listarCampanhas(id: string, nome: string, status: string): Observable<ListarCampanhasResponse> {
    const modelo: ListarCampanhasRequest = {id: id, nome: nome, status: status};
    return this.http.post<ListarCampanhasResponse>(this.config.apiUrl + '/campanha/listar', modelo,
       this.auth.getHttpOptions())
      .pipe(
        tap(
          response => {
            if (response.type === 'error') {
              console.log(response.msg);
            } 
          }
        ),
        catchError( this.handleError<ListarCampanhasResponse>('listarCampanhas', {type: 'error', msg: '', campanhas: []} ) )
      );
  }

  detalharCampanha(id: string): Observable<DetalharCampanhaResponse> {
    return this.http.get<DetalharCampanhaResponse>(this.config.apiUrl + '/campanha/detalhar/' + id, 
    this.auth.getHttpOptions())
      .pipe(
        tap(
          response => {
            if (response.type === 'error') {
              console.log(response.msg);
            } 
          }
        ),
        catchError( this.handleError<DetalharCampanhaResponse>('detalharCampanha', {type: 'error', msg: '',
         campanha: {id: 0, nome: '', status: ''}} ) )
      );
  }

  excluirCampanha(id: string): Observable<ModificarCampanhaResponse> {
    return this.http.get<ModificarCampanhaResponse>(this.config.apiUrl + '/campanha/excluir/' + id, 
    this.auth.getHttpOptions())
      .pipe(
        tap(
          response => {
            if (response.type === 'error') {
              console.log(response.msg);
            } 
          }
        ),
        catchError( this.handleError<ModificarCampanhaResponse>('excluirCampanha', {type: 'error', msg: 'Tente novamente'} ) )
      );
  }

  atualizarCampanha(campanha: Campanha): Observable<ModificarCampanhaResponse> {
    return this.http.post<ModificarCampanhaResponse>(this.config.apiUrl + '/campanha/atualizar/', campanha, 
    this.auth.getHttpOptions())
      .pipe(
        tap(
          response => {
            if (response.type === 'error') {
              console.log(response.msg);
            } 
          }
        ),
        catchError( this.handleError<ModificarCampanhaResponse>('atualizarCampanha', {type: 'error', msg: 'Tente novamente'} ) )
      );
  }

  adicionarCampanha(): Observable<DetalharCampanhaResponse> {
    return this.http.get<DetalharCampanhaResponse>(this.config.apiUrl + '/campanha/adicionar', 
    this.auth.getHttpOptions()) 
      .pipe(
        tap(
          response => {
            if (response.type === 'error') {
              console.log(response.msg);
            } 
          }
        ),
        catchError( this.handleError<DetalharCampanhaResponse>('adicionarCampanha', {type: 'error', msg: 'Tente novamente', 
          campanha: {id: 0, nome: '', status: ''}  } ) )
      );
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

class ListarCampanhasRequest {
  id: string;
  nome: string;
  status: string;
}

class ListarCampanhasResponse {
  type: string;
  msg: string;
  campanhas: Campanha[];
}

class DetalharCampanhaResponse {
  type: string;
  msg: string;
  campanha: Campanha;
}

class ModificarCampanhaResponse {
  type: string;
  msg: string;
}
