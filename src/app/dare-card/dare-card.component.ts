import { Component, Input, OnChanges } from '@angular/core';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-dare-card',
  templateUrl: './dare-card.component.html',
  styleUrls: ['./dare-card.component.scss'],
})
export class DareCardComponent {
  cardAction = [
    {
      title: 'Choose Someone',
      description: 'Pick someone to take a drink.',
    },
    {
      title: 'Self Drink',
      description: 'Take a drink.',
    },
    {
      title: "Player's Choice",
      description: 'Choose a player to drink.',
    },
    {
      title: 'Take a Sip',
      description: 'Take a drink.',
    },
    {
      title: 'Group Drink',
      description: 'Everyone with this card takes a drink.',
    },
    {
      title: 'Drinking Buddy',
      description:
        'Select a drinking buddy. Whenever you drink, they drink too.',
    },
    {
      title: 'Waterfall',
      description:
        "Start a 'Waterfall.' Everyone drinks, and you can't stop until the person to your right stops.",
    },
    {
      title: 'Choose a Mate',
      description: "Choose a 'Mate.' Whenever you drink, they drink with you.",
    },
    {
      title: 'Rhyme Time',
      description:
        "Start a 'Rhyme.' Players take turns saying words that rhyme, and the first to mess up or take too long drinks.",
    },
    {
      title: 'Create a Rule',
      description:
        "Create a rule that lasts for the rest of the game (e.g., 'Drink with your left hand' or 'Say 'Cheers!' before every sip').",
    },
    {
      title: 'Thumb King',
      description:
        "Become the 'Thumb King.' At any point, put your thumb on the table, and others must follow. The last person to do so drinks.",
    },
    {
      title: 'Question Queen',
      description:
        "Become the 'Question Queen.' You can ask anyone a question, and they must answer without saying 'Yes' or 'No.' If they fail, they drink.",
    },
    {
      title: "King's Cup",
      description:
        "Pour some of your drink into the 'King's Cup.' The player who draws the fourth King card drinks the entire cup.",
    },
  ];

  title!: string;
  description!: string;

  @Input() card!: string;

  /**
   * Updates component properties when 'card' input changes.
   */
  ngOnChanges(): void {
    if (this.card) {
      const cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
