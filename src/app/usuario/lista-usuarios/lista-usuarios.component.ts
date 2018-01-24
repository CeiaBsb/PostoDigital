import { UsuarioService } from './../usuario.service';
import { Usuario } from './../usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalProcessandoComponent } from '../../janela-mestre/modal-processando/modal-processando.component';
import { JanelaMestreComponent } from '../../janela-mestre/janela-mestre.component';
import {UtilService} from '../../util.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  visiveis: Usuario[];
  carregando = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalProcessando: ModalProcessandoComponent,
    private mestre: JanelaMestreComponent,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.mestre.setTitle('Gerenciar Usuarios');
    this.listarUsuarios();
  }

  atualizarVisiveis(parteNome: string) {
    this.visiveis = [];
    for (let usuario of this.usuarios) {
      if (this.util.normalize(usuario.nome).indexOf(this.util.normalize(parteNome)) >= 0) {
        this.visiveis.push(usuario);
      }
    }
  }

  listarUsuarios() {
    this.carregando = true;
    this.usuarioService.listarUsuarios('', '', '', '', '')
      .subscribe(
      retorno => {
        this.usuarios = retorno.usuarios;
        this.atualizarVisiveis('');
        this.carregando = false;
      }
      );
  }

  adicionarUsuario() {
    this.modalProcessando.mostrarModal();
    this.usuarioService.adicionarUsuario()
      .subscribe(
      retorno => {
        this.modalProcessando.fecharModal();
        if (retorno.type !== 'error') {
          this.router.navigate(['detalharUsuario/' + retorno.usuario.id]);
        }
      }
      );
  }

}
