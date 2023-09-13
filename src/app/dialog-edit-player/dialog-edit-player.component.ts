import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss'],
})
export class DialogEditPlayerComponent {
  profileImg!: string;

  allProfilePictures = [
    '1.png',
    '02.png',
    '03.png',
    '04.png',
    '05.png',
    '06.png',
    '07.png',
    '08.png',
    '09.png',
    '10.png',
    '11.png',
    '12.png',
  ];

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditPlayerComponent>
  ) {}
}
