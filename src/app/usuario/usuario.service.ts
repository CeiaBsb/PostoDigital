import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Usuario } from './usuario';
import { AuthenticationService } from '../login/authentication.service';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private config: ConfigurationService
  ) { }

  listarUsuarios(id: string, nome: string, login: string, status: string, perfil: string): Observable<ListarUsuariosResponse> {
    const modelo: ListarUsuariosRequest = { id: id, nome: nome, login: login, status: status, perfil: perfil };
    return this.http.post<ListarUsuariosResponse>(this.config.apiUrl + '/usuario/listar', modelo,
      this.auth.getHttpOptions())
      .pipe(
      tap(
        response => {
          if (response.type === 'error') {
            console.log(response.msg);
          }
        }
      ),
      catchError(this.handleError<ListarUsuariosResponse>('listarUsuarios', { type: 'error', msg: '', usuarios: [] }))
      );
  }


  detalharUsuario(id: string): Observable<DetalharUsuarioResponse> {
    return this.http.get<DetalharUsuarioResponse>(this.config.apiUrl + '/usuario/detalhar/' + id,
      this.auth.getHttpOptions())
      .pipe(
      tap(
        response => {
          if (response.type === 'error') {
            console.log(response.msg);
          }
        }
      ),
      catchError(this.handleError<DetalharUsuarioResponse>('detalharUsuario', {
        type: 'error', msg: '',
        usuario: { id: 0, nome: '', status: '', login: '', perfil: '', senha: '' }
      }))
      );
  }

  excluirUsuario(id: string): Observable<ModificarUsuarioResponse> {
    return this.http.get<ModificarUsuarioResponse>(this.config.apiUrl + '/usuario/excluir/' + id,
      this.auth.getHttpOptions())
      .pipe(
      tap(
        response => {
          if (response.type === 'error') {
            console.log(response.msg);
          }
        }
      ),
      catchError(this.handleError<ModificarUsuarioResponse>('excluirUsuario', { type: 'error', msg: 'Tente novamente' }))
      );
  }

  atualizarUsuario(usuario: Usuario, confirmarSenha: string): Observable<ModificarUsuarioResponse> {
    if (
      (usuario.senha !== confirmarSenha) &&
      (!((usuario.senha === '') && (confirmarSenha == null)))
    ) {
      return of({ type: 'error', msg: 'A senha e a confirmação da senha não conferem.' });
    }
    return this.http.post<ModificarUsuarioResponse>(this.config.apiUrl + '/usuario/atualizar/', usuario,
      this.auth.getHttpOptions())
      .pipe(
      tap(
        response => {
          if (response.type === 'error') {
            console.log(response.msg);
          }
        }
      ),
      catchError(this.handleError<ModificarUsuarioResponse>('atualizarUsuario', { type: 'error', msg: 'Tente novamente' }))
      );
  }

  adicionarUsuario(): Observable<DetalharUsuarioResponse> {
    return this.http.get<DetalharUsuarioResponse>(this.config.apiUrl + '/usuario/adicionar',
      this.auth.getHttpOptions())
      .pipe(
      tap(
        response => {
          if (response.type === 'error') {
            console.log(response.msg);
          }
        }
      ),
      catchError(this.handleError<DetalharUsuarioResponse>('adicionarUsuario', {
        type: 'error', msg: 'Tente novamente',
        usuario: { id: 0, nome: '', status: '', login: '', perfil: '', senha: '' }
      }))
      );
  }

  listarCampanhas(id: string): Observable<ListaCampanhasResponse> {
    return this.http.get<ListaCampanhasResponse>(this.config.apiUrl + '/usuario/listarCampanhas/' + id,
      this.auth.getHttpOptions())
      .pipe(
      tap(
        response => {
          if (response.type === 'error') {
            console.log(response.msg);
          }
          for (const campanha of response.campanhas) {
            if (String(campanha.relacionado) === 'true') {
              campanha.relacionado = true;
            } else {
              campanha.relacionado = false;
            }
          }
        }
      ),
      catchError(this.handleError<ListaCampanhasResponse>('listarCampanhas', { type: 'error', msg: 'Tente novamente', campanhas: [] }))
      );
  }

  atualizarCampanhas(idUsuario: string, campanhas: CampanhaRelacionada[]): Observable<ModificarUsuarioResponse> {
    const request: AtualizarCampanhasRequest = {id_usuario: idUsuario, campanhas_relacionadas: []};
    for (const campanha of campanhas) {
      if (campanha.relacionado) {
        request.campanhas_relacionadas.push(campanha.id);
      }
    }
    return this.http.post<ModificarUsuarioResponse>(this.config.apiUrl + '/usuario/atualizarCampanhas', request,
      this.auth.getHttpOptions())
      .pipe(
      tap(
        response => {
          if (response.type === 'error') {
            console.log(response.msg);
          }
        }
      ),
      catchError(this.handleError<ModificarUsuarioResponse>('atualizarCampanhas', { type: 'error', msg: 'Tente novamente' }))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // mostra o erro no console do browser
      console.error(error);

      // retorna o resultado alternativo
      return of(result as T);
    };
  }
}

class ListarUsuariosRequest {
  id: string;
  nome: string;
  login: string;
  status: string;
  perfil: string;
}

class ListarUsuariosResponse {
  type: string;
  msg: string;
  usuarios: Usuario[];
}

class CampanhaRelacionada {
  id: string;
  nome: string;
  relacionado: boolean;
}

class ListaCampanhasResponse {
  type: string;
  msg: string;
  campanhas: CampanhaRelacionada[];
}

class AtualizarCampanhasRequest {
  id_usuario: string;
  campanhas_relacionadas: string[];
}

class DetalharUsuarioResponse {
  type: string;
  msg: string;
  usuario: Usuario;
}

class ModificarUsuarioResponse {
  type: string;
  msg: string;
}
