import { Component } from '@angular/core';
import { Mount } from 'src/app/interfaces/mount';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.css'],
})
export class MountsComponent {
  mounts: Mount[] = [
    {
      name: '🐲Dragon',
      type: 'Puissant et majestueux',
      description:
        'Le dragon est votre allié ultime pour les batailles aériennes.',
      image: 'assets/images/dragon-monture.jpg',
    },
    {
      name: '🐴 Cheval',
      type: 'Vitesse et agilité',
      description:
        'Le cheval offre une grande vitesse et agilité pour parcourir la forêt.',
      image: 'assets/images/cheval.jpg',
    },
    {
      name: '🦄 Licorne',
      type: 'Magie et grâce',
      description:
        'La licorne, avec sa grâce et sa magie, est une monture noble et rare.',
      image: 'assets/images/licorne.jpg',
    },
  ];

  selectedMount: Mount | null = null;

  selectMount(mount: Mount) {
    this.selectedMount = mount;
  }
}
