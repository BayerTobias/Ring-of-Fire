import { Component } from '@angular/core';
import { Game } from '../classes/game.class';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  takeCardAnimation = false;
  game: object = [];

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  takeCard() {
    this.takeCardAnimation = true;
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
}
