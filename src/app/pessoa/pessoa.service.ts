import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Pessoa } from './pessoa';
import { AuthenticationService } from '../login/authentication.service';
import { ConfigurationService } from '../configuration.service';
import { UtilService } from '../util.service';

@Injectable()
export class PessoaService {

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private config: ConfigurationService
    ) { }

    listarPessoas(id: string, nome: string, nome_mae: string, atualizado: string, tem_foto: string):
        Observable<ListarPessoasResponse> {
        const modelo: ListarPessoasRequest = { id: id, nome: nome, nome_mae: nome_mae, atualizado: atualizado, tem_foto: tem_foto };
        return this.http.post<ListarPessoasResponse>(this.config.apiUrl + '/pessoa/listar', modelo,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ListarPessoasResponse>({ type: 'error', msg: 'Erro de conexão com a API.', pessoas: [] }))
            );
    }

    detalharPessoa(id: string): Observable<DetalharPessoaResponse> {
        return this.http.get<DetalharPessoaResponse>(this.config.apiUrl + '/pessoa/detalhar/' + id,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                    const date = new Date(response.pessoa.dt_nascimento);
                    date.setTime(date.getTime() + 3600000 * this.config.hourAdjust);
                    response.pessoa.dt_nascimento = date;
                    return response;
                }
            ),
            catchError(UtilService.handleError<DetalharPessoaResponse>({
                type: 'error', msg: 'Erro de conexão com a API.',
                pessoa: { id: 0, nome: '', dt_nascimento: new Date(), nome_mae: '', atualizado: false, tem_foto: '' }
            }))
            );
    }

    uploadFile(file: File, id: string): Observable<ConfirmationResponse> {

        const formData = new FormData();
        formData.append('userfile', file);
        const options = {
            headers: new HttpHeaders({ 'jwt': this.auth.getToken(), 'enctype': 'multipart/form-data' })
        };

        return this.http.post<ConfirmationResponse>(this.config.apiUrl + '/upload/' + id, formData, options)
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ConfirmationResponse>({ type: 'error', msg: 'Erro de conexão com a API.' }))
            );
    }

    excluirPessoa(id: string): Observable<ConfirmationResponse> {
        return this.http.get<ConfirmationResponse>(this.config.apiUrl + '/pessoa/excluir/' + id,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ConfirmationResponse>({ type: 'error', msg: 'Erro de conexão com a API.' }))
            );
    }

    atualizarPessoa(pessoa: Pessoa): Observable<ConfirmationResponse> {
        return this.http.post<ConfirmationResponse>(this.config.apiUrl + '/pessoa/atualizar/', pessoa,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ConfirmationResponse>({ type: 'error', msg: 'Erro de conexão com a API.' }))
            );
    }

    adicionarPessoa(): Observable<DetalharPessoaResponse> {
        return this.http.get<DetalharPessoaResponse>(this.config.apiUrl + '/pessoa/adicionar',
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<DetalharPessoaResponse>({
                type: 'error', msg: 'Erro de conexão com a API.',
                pessoa: { id: 0, nome: '', dt_nascimento: new Date(), nome_mae: '', atualizado: false, tem_foto: '' }
            }))
            );
    }

    listarFolhasPresenca(id: string): Observable<ListaFolhasResponse> {
        return this.http.get<ListaFolhasResponse>(this.config.apiUrl + '/pessoa/listarFolhasPresenca/' + id,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                    for (const folha of response.folhas) {
                        if (String(folha.relacionado) === 'true') {
                            folha.relacionado = true;
                        } else {
                            folha.relacionado = false;
                        }
                    }
                }
            ),
            catchError(UtilService.handleError<ListaFolhasResponse>({ type: 'error', msg: 'Erro de conexão com a API.', folhas: [] }))
            );
    }

    atualizarFolhasPresenca(idPessoa: string, folhas: FolhaRelacionada[]): Observable<ConfirmationResponse> {
        const request: AtualizarFolhasRequest = { id_pessoa: idPessoa, folhas_relacionadas: [] };
        for (const folha of folhas) {
            if (folha.relacionado) {
                request.folhas_relacionadas.push(folha.id);
            }
        }
        return this.http.post<ConfirmationResponse>(this.config.apiUrl + '/pessoa/atualizarFolhasPresenca', request,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ConfirmationResponse>({ type: 'error', msg: 'Erro de conexão com a API.' }))
            );
    }
}

class ListarPessoasRequest {
    id: string;
    nome: string;
    nome_mae: string;
    atualizado: string;
    tem_foto: string;
}

class ListarPessoasResponse {
    type: string;
    msg: string;
    pessoas: Pessoa[];
}

class DetalharPessoaResponse {
    type: string;
    msg: string;
    pessoa: Pessoa;
}

class ConfirmationResponse {
    type: string;
    msg: string;
}

class FolhaRelacionada {
    id: string;
    nome: string;
    campanha: string;
    relacionado: boolean;
}

class ListaFolhasResponse {
    type: string;
    msg: string;
    folhas: FolhaRelacionada[];
}

class AtualizarFolhasRequest {
    id_pessoa: string;
    folhas_relacionadas: string[];
}
