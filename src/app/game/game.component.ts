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
  playerOverview: boolean = false;

  audioArray: string[] = [
    'playing_cards_01.wav',
    'playing_cards_02.wav',
    'playing_cards_03.wav',
    'playing_cards_04.wav',
  ];

  unsubGames;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.setGameId();
    this.unsubGames = this.subGames();
  }

  /**
   * Initializes the component by starting a new game.
   */
  ngOnInit() {
    this.newGame();
  }

  /**
   * Sets the game ID based on the current route parameters.
   * This function subscribes to route parameters and updates the game ID
   * when the route parameters change.
   */
  setGameId() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
    });
  }

  /**
   * Unsubscribes from any active subscriptions when the component is destroyed.
   */
  ngOnDestroy() {
    this.unsubGames();
  }

  /**
   * Subscribes to real-time updates of a specific game document
   * and updates the local game state accordingly.
   * @returns {Unsubscribe} - A function to stop listening to updates.
   */
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
    });
  }

  /**
   * Uploads a new game document to Firestore.
   * @param {Object} item - The game data to be added.
   */
  async uploadNewGame(item: {}) {
    await addDoc(this.getGamesRef(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef: any) => {
        console.log('Document written with ID', docRef);
      });
  }

  /**
   * Updates the game document in Firestore if a game ID is available.
   */
  async updateGame() {
    if (this.gameId) {
      await updateDoc(
        this.getSingleGameRef('games', this.gameId),
        this.game.toJson()
      ).catch((err) => console.error(err));
    }
  }

  /**
   * Retrieves a reference to the 'games' collection in Firestore.
   * @returns {CollectionReference} - Reference to the 'games' collection.
   */
  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  /**
   * Retrieves a reference to a single game document in Firestore.
   * @param {string} colId - The ID of the collection containing the document.
   * @param {string} docId - The ID of the game document.
   * @returns {DocumentReference} - Reference to the specified game document.
   */
  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  /**
   * Initiates the card draw process if animation is not in progress.
   */
  takeCard() {
    if (!this.game.takeCardAnimation) {
      if (this.game.stack.length > 0) {
        this.handleCardDraw();

        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.takeCardAnimation = false;
          this.updateGame();
        }, 1700);
      } else console.warn('error');
    }
  }

  /**
   * Handles the card draw process, updates game state, and progresses the game.
   */
  handleCardDraw() {
    this.drawCard();
    if (this.game.stack.length == 0) this.game.gameOver = true;
    this.nextPlayer();
    this.updateGame();
  }

  /**
   * Draws a card from the game stack, plays a random audio, and initiates card animation.
   */
  drawCard() {
    this.game.currentCard = this.game.stack.pop() as string;
    this.playRandomAudio();
    this.game.takeCardAnimation = true;
  }

  /**
   * Advances the current player's turn to the next player in the game.
   */
  nextPlayer(): void {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }

  /**
   * Initializes a new game by creating a new 'Game' instance.
   */
  newGame() {
    this.game = new Game();
  }

  /**
   * Restarts the game by resetting game state and updating it.
   */
  restartGame() {
    this.game.stack = [];
    this.game.fillStack();
    this.game.playedCards = [];
    this.game.currentCard = '';
    this.game.gameOver = false;
    this.updateGame();
  }

  /**
   * Opens a dialog for adding a new player to the game.
   * If a player name is provided, it adds the player and updates the game.
   */
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

  /**
   * Opens a dialog for editing a player's information or deleting a player.
   * If changes are made, it updates the player's information and the game.
   * @param {number} index - The index of the player to edit.
   */
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

  /**
   * Deletes a player from the game based on their index.
   * @param {number} index - The index of the player to delete.
   */
  deletePlayer(index: number): void {
    this.game.players.splice(index, 1);
    this.game.playerImages.splice(index, 1);
  }

  /**
   * Toggles the player overview display on/off.
   */
  togglePlayerOverview() {
    this.playerOverview = !this.playerOverview;
  }

  /**
   * Plays a randomly selected audio from the available audio files.
   */
  playRandomAudio() {
    const audioIndex = Math.floor(Math.random() * this.audioArray.length);
    const audio = new Audio('./assets/audio/' + this.audioArray[audioIndex]);
    audio.play();
  }
}
