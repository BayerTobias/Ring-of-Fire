import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-warning-dialog-card',
  templateUrl: './warning-dialog-card.component.html',
  styleUrls: ['./warning-dialog-card.component.scss'],
})
export class WarningDialogCardComponent {
  @Input() gameOver!: boolean;
  @Output() restartGameClicked = new EventEmitter<void>();

  /**
   * Emits an event to signal that the restart game action was triggered.
   */
  handleRestartGame() {
    this.restartGameClicked.emit();
  }
}
