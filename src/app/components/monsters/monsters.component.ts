import { Component } from '@angular/core';
import { Monster } from 'src/app/interfaces/monster';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css'],
})
export class MonstersComponent {
  monsters: Monster[] = [
    {
      name: 'Loup',
      description: 'Un loup féroce.',
      image: 'assets/images/loup.gif',
    },
    {
      name: 'Dragon',
      description: 'Un dragon cracheur de feu.',
      image: 'assets/images/dragon.gif',
    },
    {
      name: 'Chien enragé',
      description: 'Un chien enragé terrifiant.',
      image: 'assets/images/chien-enrage.jpg',
    },
  ];

  selectedMonster: Monster | null = null;

  selectMonster(monster: Monster): void {
    this.selectedMonster = monster;
  }
}
