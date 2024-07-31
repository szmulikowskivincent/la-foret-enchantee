import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zone-de-jeu',
  templateUrl: './zone-de-jeu.component.html',
  styleUrls: ['./zone-de-jeu.component.css'],
})
export class ZoneDeJeuComponent implements OnInit {
  playerAvatar: string = 'assets/avatar/Avatar-Défaut.webp';
  availableAvatars: { name: string; src: string }[] = [
    { name: 'Messenger', src: 'assets/avatar/Avatar/avatar1.png' },
    { name: 'Bleu', src: 'assets/avatar/Avatar/avatar-default-icon.png' },
    { name: 'Noir', src: 'assets/avatar/Avatar/Avatar_Defaut.png' },
  ];

  selectedHero: any;
  selectedMount: any;
  selectedMonster: any;
  selectedWeapon: any;
  points: number = 0;
  private pointSound = new Audio('assets/audio/07-galaga-dive-2-83169.mp3');
  private laughSound = new Audio('assets/audio/game-over-31-179699.mp3');
  gameOver: boolean = false;

  playerName: string = 'Vincent';
  playerScore: number = 5126;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedHero = params['hero'] ? JSON.parse(params['hero']) : null;
      this.selectedMount = params['mount'] ? JSON.parse(params['mount']) : null;
      this.selectedMonster = params['monster']
        ? JSON.parse(params['monster'])
        : null;
      this.selectedWeapon = params['weapon']
        ? JSON.parse(params['weapon'])
        : null;
    });
  }

  changeAvatar(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedAvatarSrc = selectElement.value;
    if (
      this.availableAvatars.some((avatar) => avatar.src === selectedAvatarSrc)
    ) {
      this.playerAvatar = selectedAvatarSrc;
    }
  }

  startGame(): void {
    if (this.gameOver) return;

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

  launchArrows(): void {
    if (this.gameOver) return;

    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      arrow.textContent = '➡️';
      emoticonContainer.appendChild(arrow);

      const emoticons = Array.from(
        emoticonContainer.getElementsByClassName('emoticon')
      );
      emoticons.forEach((emoticon) => {
        if (this.checkCollision(arrow, emoticon as HTMLElement)) {
          emoticon.remove();
          this.points += 10;
          this.pointSound.play();
        }
      });

      setTimeout(() => {
        arrow.remove();
      }, 1000);
    }
  }

  launchWolves(): void {
    if (this.gameOver) return;

    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      const wolf = document.createElement('div');
      wolf.className = 'wolf';
      wolf.textContent = '🐺';
      emoticonContainer.appendChild(wolf);

      const emoticons = Array.from(
        emoticonContainer.getElementsByClassName('emoticon')
      );
      emoticons.forEach((emoticon) => {
        if (this.checkCollision(wolf, emoticon as HTMLElement)) {
          emoticon.remove();
          this.points -= 10;
          this.laughSound.play();
        }
      });

      setTimeout(() => {
        wolf.remove();
      }, 1000);
    }
  }

  restartGame(): void {
    this.points = 0;
    this.gameOver = false;
    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      emoticonContainer.innerHTML = '';
    }
  }

  checkCollision(a: HTMLElement, b: HTMLElement): boolean {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !(
      aRect.top + aRect.height < bRect.top ||
      aRect.top > bRect.top + bRect.height ||
      aRect.left + aRect.width < bRect.left ||
      aRect.left > bRect.left + bRect.width
    );
  }

  animateEmoticon(emoticon: HTMLElement): void {
    const duration = 5000;
    const start = Date.now();
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = elapsed / duration;
      if (progress < 1) {
        const x = startX + Math.sin(progress * Math.PI * 2) * 100;
        const y = startY + progress * window.innerHeight;
        emoticon.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animate);
      } else {
        emoticon.remove();
      }
    };

    animate();
  }
}
