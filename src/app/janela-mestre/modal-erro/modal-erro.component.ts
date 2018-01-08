import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal-erro',
  templateUrl: './modal-erro.component.html',
  styleUrls: ['./modal-erro.component.css']
})
export class ModalErroComponent implements OnInit {

  static dialogRef: MatDialogRef<ModalErroComponent>;
  static mensagem: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  mostrarModal(mensagem: string): void {
    ModalErroComponent.mensagem = mensagem;
    ModalErroComponent.dialogRef = this.dialog.open(ModalErroComponent, {
      height: '200px',  width: '300px',
    });
  }

  fecharModal(): void {
    ModalErroComponent.dialogRef.close();
  }

  getMensagem() {
    return ModalErroComponent.mensagem;
  }
}
