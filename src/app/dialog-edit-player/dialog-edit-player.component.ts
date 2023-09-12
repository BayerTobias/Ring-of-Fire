import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss'],
})
export class DialogEditPlayerComponent {
  img!: string;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditPlayerComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
