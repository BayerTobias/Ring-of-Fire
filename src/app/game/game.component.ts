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
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  firestore: Firestore = inject(Firestore);

  game!: Game;
  gameId!: string;

  unsubGames;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.setGameId();
    this.unsubGames = this.subGames();
  }

  ngOnInit() {
    this.newGame();
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
      this.game.playerImages = gamedata.playerImages;
      this.game.playedCards = gamedata.playedCards;
      this.game.stack = gamedata.stack;
      this.game.currentCard = gamedata.currentCard;
      this.game.takeCardAnimation = gamedata.takeCardAnimation;
      this.game.gameOver = gamedata.gameOver;

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
    if (!this.game.takeCardAnimation) {
      if (this.game.stack.length > 0) {
        this.game.currentCard = this.game.stack.pop() as string;
        this.game.takeCardAnimation = true;
        if (this.game.stack.length == 0) this.game.gameOver = true;
        this.nextPlayer();
        this.updateGame();

        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.takeCardAnimation = false;
          this.updateGame();
        }, 1700);
      } else {
        console.warn('error');
      }
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

  restartGame() {
    this.game.stack = [];
    this.game.fillStack();
    this.game.playedCards = [];
    this.game.currentCard = '';
    this.game.gameOver = false;
    this.updateGame();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
        this.game.playerImages.push('1.png');
      }
      this.updateGame();
    });
  }

  openEditDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change === 'DELETE') {
          this.deletePlayer(index);
        } else this.game.playerImages[index] = change;
        this.updateGame();
      }
    });
  }

  deletePlayer(index: number): void {
    this.game.players.splice(index, 1);
    this.game.playerImages.splice(index, 1);
  }
}
