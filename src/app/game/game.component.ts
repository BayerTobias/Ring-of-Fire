import { Component, inject } from '@angular/core';
import { Game } from '../classes/game.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  firestore: Firestore = inject(Firestore);

  takeCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  gameId!: string;

  unsubGames;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.setGameId();
    this.unsubGames = this.subGames();
  }

  ngOnInit() {
    this.newGame();
    // this.uploadNewGame(this.game.toJson());
  }

  setGameId() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
    });
  }

  ngOnDestroy() {
    this.unsubGames();
  }

  subGames() {
    return onSnapshot(this.getSingleGameRef('games', this.gameId), (game) => {
      const gamedata: any = game.data();

      this.game.currentPlayer = gamedata.currentPlayer;
      this.game.players = gamedata.players;
      this.game.playedCards = gamedata.playedCards;
      this.game.stack = gamedata.stack;

      console.log('game is ', gamedata);
    });
  }

  async uploadNewGame(item: {}) {
    await addDoc(this.getGamesRef(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef: any) => {
        console.log('Document written with ID', docRef);
      });
  }

  async updateGame() {
    if (this.gameId) {
      await updateDoc(
        this.getSingleGameRef('games', this.gameId),
        this.game.toJson()
      ).catch((err) => console.error(err));
    }
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
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
      this.updateGame();
    });
  }
}
