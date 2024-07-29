import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zone-de-jeu',
  templateUrl: './zone-de-jeu.component.html',
  styleUrls: ['./zone-de-jeu.component.css'],
})
export class ZoneDeJeuComponent implements OnInit {
  selectedHero: any;
  selectedMount: any;
  selectedMonster: any;
  selectedWeapon: any;
  points: number = 0;
  private pointSound = new Audio('assets/audio/07-galaga-dive-2-83169.mp3');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedHero = JSON.parse(params['hero']);
      this.selectedMount = JSON.parse(params['mount']);
      this.selectedMonster = JSON.parse(params['monster']);
      this.selectedWeapon = JSON.parse(params['weapon']);
    });
  }

  startGame() {
    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      emoticonContainer.innerHTML = '';

      const emoticons = [
        { emoji: '🦸', selected: this.selectedHero },
        { emoji: '🦄', selected: this.selectedMount },
        { emoji: '👾', selected: this.selectedMonster },
      ];

      emoticons.forEach((item) => {
        if (item.selected) {
          const emoticonDiv = document.createElement('div');
          emoticonDiv.className = 'emoticon';
          emoticonDiv.textContent = item.emoji;
          emoticonDiv.style.fontSize = '30px';
          emoticonContainer.appendChild(emoticonDiv);
          this.animateEmoticon(emoticonDiv);
        }
      });
    }
  }

  launchArrows() {
    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.textContent = '➡️';
      emoticonContainer.appendChild(arrow);

      const emoticons = emoticonContainer.querySelectorAll(
        '.emoticon'
      ) as NodeListOf<HTMLElement>;
      emoticons.forEach((emoticon: HTMLElement) => {
        const boundingRect = emoticon.getBoundingClientRect();
        const arrowClone = arrow.cloneNode(true) as HTMLElement;
        arrowClone.style.position = 'absolute';
        arrowClone.style.left = `${boundingRect.left}px`;
        arrowClone.style.top = `${boundingRect.top}px`;
        document.body.appendChild(arrowClone);

        const arrowAnimation = arrowClone.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }],
          {
            duration: 1000,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        );

        arrowAnimation.onfinish = () => {
          this.checkCollisions();
          document.body.removeChild(arrowClone);
        };
      });
      emoticonContainer.removeChild(arrow);
    }
  }

  createAsterisk(container: HTMLElement, x: number, y: number) {
    const asterisk = document.createElement('div');
    asterisk.className = 'asterisk';
    asterisk.textContent = '*';
    asterisk.style.position = 'absolute';
    asterisk.style.left = `${x}px`;
    asterisk.style.top = `${y}px`;
    asterisk.style.color = 'red';
    asterisk.style.fontSize = '30px';
    container.appendChild(asterisk);

    setTimeout(() => {
      container.removeChild(asterisk);
    }, 1000);
  }

  animateEmoticon(element: HTMLElement): void {
    const randomX = Math.floor(Math.random() * 500) - 250;
    const randomY = Math.floor(Math.random() * 500) - 250;
    element.animate(
      [
        { transform: 'translate(0, 0)' },
        { transform: `translate(${randomX}px, ${randomY}px)` },
        { transform: 'translate(0, 0)' },
      ],
      {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );
  }

  checkCollisions() {
    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      const arrows = document.querySelectorAll(
        '.arrow'
      ) as NodeListOf<HTMLElement>;
      const emoticons = emoticonContainer.querySelectorAll(
        '.emoticon'
      ) as NodeListOf<HTMLElement>;

      arrows.forEach((arrow) => {
        const arrowRect = arrow.getBoundingClientRect();
        emoticons.forEach((emoticon) => {
          const emoticonRect = emoticon.getBoundingClientRect();
          if (this.isCollision(arrowRect, emoticonRect)) {
            this.updatePoints();
            this.createAsterisk(
              emoticonContainer,
              emoticonRect.left,
              emoticonRect.top
            );
          }
        });
      });
    }
  }

  isCollision(arrowRect: DOMRect, emoticonRect: DOMRect): boolean {
    return !(
      arrowRect.right < emoticonRect.left ||
      arrowRect.left > emoticonRect.right ||
      arrowRect.bottom < emoticonRect.top ||
      arrowRect.top > emoticonRect.bottom
    );
  }

  updatePoints() {
    this.points += 10;
    this.updatePointsDisplay();
    this.playPointSound();
  }

  updatePointsDisplay() {
    const pointsElement = document.getElementById('points');
    if (pointsElement) {
      pointsElement.textContent = this.points.toString();
    }
  }

  playPointSound() {
    this.pointSound.play();
  }
}
