import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfigurationService } from '../../../../configuration.service';

@Component({
  selector: 'app-modal-foto',
  templateUrl: './modal-foto.component.html',
  styleUrls: ['./modal-foto.component.css']
})
export class ModalFotoComponent implements OnInit {

  static idPessoa: string;
  static nomePessoa: string;

  dialogRef: MatDialogRef<ModalFotoComponent>;

  constructor(
    private config: ConfigurationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  mostrarModal(id: string, nome: string): void {
    ModalFotoComponent.idPessoa = id;
    ModalFotoComponent.nomePessoa = nome;
    this.dialogRef = this.dialog.open(ModalFotoComponent, {
      height: '400px',  width: '348px'
    });
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  getIdPessoa() {
    return ModalFotoComponent.idPessoa;
  }

  getNomePessoa() {
    return ModalFotoComponent.nomePessoa;
  }

}
