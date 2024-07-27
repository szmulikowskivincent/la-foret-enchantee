import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zone-de-jeu',
  templateUrl: './zone-de-jeu.component.html',
  styleUrls: ['./zone-de-jeu.component.css']
})
export class ZoneDeJeuComponent implements OnInit {
  selectedHero: any;
  selectedMount: any;
  selectedMonster: any;
  selectedWeapon: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedHero = JSON.parse(params['hero']);
      this.selectedMount = JSON.parse(params['mount']);
      this.selectedMonster = JSON.parse(params['monster']);
      this.selectedWeapon = JSON.parse(params['weapon']);
    });
  }
}

