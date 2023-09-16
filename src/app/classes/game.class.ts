export class Game {
  public players: string[] = [];
  public playerImages: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public takeCardAnimation = false;
  public currentCard: string = '';
  public gameOver: boolean = false;

  constructor() {
    this.fillStack();
  }

  public toJson() {
    return {
      players: this.players,
      playerImages: this.playerImages,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      takeCardAnimation: this.takeCardAnimation,
      currentCard: this.currentCard,
      gameOver: this.gameOver,
    };
  }

  fillStack() {
    for (let i = 1; i < 3; /*14*/ i++) {
      this.stack.push('spade_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
    }
    this.shuffle(this.stack);
  }

  shuffle(array: string[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
