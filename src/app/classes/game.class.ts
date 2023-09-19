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

  /**
   * Fills the game stack with a standard deck of cards, shuffles it, and prepares it for gameplay.
   */
  fillStack() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('spade_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
    }
    this.shuffle(this.stack);
  }

  /**
   * Shuffles the elements in an array using the Fisher-Yates shuffle algorithm.
   * @param {string[]} array - The array to be shuffled.
   * @returns {string[]} - The shuffled array.
   */
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
