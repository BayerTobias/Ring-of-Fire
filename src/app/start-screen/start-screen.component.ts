import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../classes/game.class';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  /**
   * Creates a new game instance, adds it to Firestore, and navigates to the game's URL.
   */
  async newGame() {
    const game = new Game();
    await addDoc(collection(this.firestore, 'games'), game.toJson())
      .catch((err) => {
        console.error(err);
      })
      .then((docRef: any) => {
        console.log('Document written with ID', docRef.id);
        this.router.navigateByUrl('/game/' + docRef.id);
      });
  }
}
