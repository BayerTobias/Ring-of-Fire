import { Component } from '@angular/core';
import { Game } from '../classes/game.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  takeCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.newGame();
  }

  takeCard() {
    if (!this.takeCardAnimation) {
      if (this.game.stack.length > 0) {
        this.currentCard = this.game.stack.pop() as string;
        this.takeCardAnimation = true;
        this.nextPlayer();

        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.takeCardAnimation = false;
        }, 1700);
      } else console.log('Game Over');
    }
  }

  nextPlayer(): void {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }

  newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) this.game.players.push(name);
    });
  }
}
