import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Campanha } from './campanha';
import { AuthenticationService } from '../login/authentication.service';
import {ConfigurationService} from '../configuration.service';
import { UtilService } from '../util.service';

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
        catchError( UtilService.handleError<ListarCampanhasResponse>( { type: 'error', msg: 'Erro de conexão com a API.', campanhas: []} ) )
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
        catchError( UtilService.handleError<ListarCampanhasResponse>( { type: 'error', msg: 'Erro de conexão com a API.', campanhas: []} ) )
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
        catchError( UtilService.handleError<DetalharCampanhaResponse>( { type: 'error', msg: 'Erro de conexão com a API.',
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
        catchError( UtilService.handleError<ModificarCampanhaResponse>( { type: 'error', msg: 'Erro de conexão com a API.'} ) )
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
        catchError( UtilService.handleError<ModificarCampanhaResponse>( { type: 'error', msg: 'Erro de conexão com a API.'} ) )
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
        catchError( UtilService.handleError<DetalharCampanhaResponse>( { type: 'error', msg: 'Erro de conexão com a API.', 
          campanha: {id: 0, nome: '', status: ''}  } ) )
      );
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
