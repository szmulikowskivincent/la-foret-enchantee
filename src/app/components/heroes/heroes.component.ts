import { Component } from '@angular/core';
import { Hero, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero: Hero | null = null;
  weapons: string[] = [];

  constructor(private dataService: DataService) {
    this.heroes = this.dataService.heroes;
    this.weapons = this.dataService.weapons;
  }

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
  }
}
