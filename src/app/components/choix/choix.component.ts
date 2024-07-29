import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Hero {
  name: string;
  image: string;
  type: string;
  description: string;
}

interface Mount {
  name: string;
  image: string;
  type: string;
  description: string;
}

interface Monster {
  name: string;
  image: string;
  description: string;
}

interface Weapon {
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-choix',
  templateUrl: './choix.component.html',
  styleUrls: ['./choix.component.css'],
})
export class ChoixComponent {
  heroes: Hero[] = [
    {
      name: 'Peter ⭐⭐⭐',
      image: 'assets/images/peter.png',
      type: 'Type A',
      description: 'Agile',
    },
    {
      name: 'Elia⭐⭐⭐⭐',
      image: 'assets/images/elia.jpg',
      type: 'Type B',
      description: 'Rapide',
    },
    {
      name: 'Jo⭐⭐',
      image: 'assets/images/jo.jpg',
      type: 'Type B',
      description: 'Enchanteur',
    },
  ];

  mounts: Mount[] = [
    {
      name: 'Dragon',
      image: 'assets/images/dragon-monture.jpg',
      type: 'Type A',
      description: 'Souriant',
    },
    {
      name: 'Cheval',
      image: 'assets/images/cheval.jpg',
      type: 'Type B',
      description: 'Puissant',
    },
    {
      name: 'Mount 3',
      image: 'assets/images/licorne.jpg',
      type: 'Type B',
      description: 'Mythique',
    },
  ];

  monsters: Monster[] = [
    {
      name: 'Dragon',
      image: 'assets/images/dragon.gif',
      description: 'Cracheur de feu',
    },
    {
      name: 'Chien enragé',
      image: 'assets/images/chien-enrage.jpg',
      description: 'Agresif',
    },
    { name: 'Licorne', image: 'assets/images/loup.gif', description: 'Furtif' },
  ];

  weapons: Weapon[] = [
    {
      name: 'Arbaléte',
      image: 'assets/images/arbalete.jpg',
      description: 'Rapidité',
    },
    {
      name: 'Couteau',
      image: 'assets/images/couteau.jpg',
      description: 'Discretion',
    },
    { name: 'Arc', image: 'assets/images/arc.avif', description: 'Précision' },
  ];

  selectedHero: Hero | null = null;
  selectedMount: Mount | null = null;
  selectedMonster: Monster | null = null;
  selectedWeapon: Weapon | null = null;

  constructor(private router: Router) {}

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }

  selectMount(mount: Mount) {
    this.selectedMount = mount;
  }

  selectMonster(monster: Monster) {
    this.selectedMonster = monster;
  }

  selectWeapon(weapon: Weapon) {
    this.selectedWeapon = weapon;
  }

  goToZoneDeJeu() {
    if (
      this.selectedHero &&
      this.selectedMount &&
      this.selectedMonster &&
      this.selectedWeapon
    ) {
      this.router.navigate(['/zone-de-jeu'], {
        queryParams: {
          hero: JSON.stringify(this.selectedHero),
          mount: JSON.stringify(this.selectedMount),
          monster: JSON.stringify(this.selectedMonster),
          weapon: JSON.stringify(this.selectedWeapon),
        },
      });
    } else {
      console.error(
        'Veuillez sélectionner un héros, une monture, un monstre et une arme avant de continuer.'
      );
    }
  }
}
