// data.service.ts
import { Injectable } from '@angular/core';

export interface Hero {
  name: string;
  type: string;
  image: string;
  description: string; 
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  heroes: Hero[] = [
    { name: 'Jo', type: 'Nain', image: 'assets/images/jo.jpg', description: 'Un guerrier courageux, armé de son arbalète.' },
    { name: 'Peter', type: 'Lutin', image: 'assets/images/peter.png', description: 'Agile et rusé, il utilise son lance-pierre pour repousser les ennemis.' },
    { name: 'Elia', type: 'Fée', image: 'assets/images/elia.jpg', description: 'Dotée de pouvoirs magiques, elle manie un arc à flèches enchantées.' },
  ];

  weapons = ['🏹 Arbalète', '🛠 Lance pierre', '🗡️ Arc à flèche'];

  mounts = ['Cheval', 'Dragon', 'Loup'];

  monsters = ['Chiens enragés', 'Lion enragés'];

  constructor() {}
}



