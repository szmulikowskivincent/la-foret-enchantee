import { Component } from '@angular/core';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent {
  weapons = [
    { name: '🏹Arbalète', description: 'Une arme puissante pour les combats à distance.', image: 'assets/images/arbalete.jpg' },
    { name: '🗡️Couteau', description: 'Parfait pour les combats rapprochés.', image: 'assets/images/couteau.jpg' },
    { name: 'જ⁀➴ ♡Arc à flèches', description: 'Idéal pour une précision à longue distance.', image: 'assets/images/arc.avif' },
  ];

  selectedWeapon: any = null;

  selectWeapon(weapon: any): void {
    this.selectedWeapon = weapon;
  }
}

