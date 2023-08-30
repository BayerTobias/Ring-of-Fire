import { Component } from '@angular/core';
import { Game } from '../classes/game.class';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  takeCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  takeCard() {
    if (!this.takeCardAnimation) {
      if (this.game.stack.length > 0) {
        this.currentCard = this.game.stack.pop() as string;
        this.takeCardAnimation = true;

        setTimeout(() => {
          this.takeCardAnimation = false;
        }, 1700);
      } else console.log('Game Over');
    }
  }

  newGame() {
    this.game = new Game();
  }
}
