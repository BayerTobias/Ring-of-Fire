import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-warning-dialog-card',
  templateUrl: './warning-dialog-card.component.html',
  styleUrls: ['./warning-dialog-card.component.scss'],
})
export class WarningDialogCardComponent {
  @Input() gameOver!: boolean;
  @Output() restartGameClicked = new EventEmitter<void>();

  handleRestartGame() {
    this.restartGameClicked.emit();
  }
}
