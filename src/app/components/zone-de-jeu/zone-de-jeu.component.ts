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
  private laughSound = new Audio('assets/audio/game-over-31-179699.mp3');
  gameOver: boolean = false;

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

  launchArrows() {
    if (this.gameOver) return;

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

  launchWolves() {
    if (this.gameOver) return;

    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      const wolf = document.createElement('div');
      wolf.className = 'wolf';
      wolf.textContent = '🐺';
      emoticonContainer.appendChild(wolf);

      const emoticons = emoticonContainer.querySelectorAll(
        '.emoticon'
      ) as NodeListOf<HTMLElement>;
      emoticons.forEach((emoticon: HTMLElement) => {
        const boundingRect = emoticon.getBoundingClientRect();
        const wolfClone = wolf.cloneNode(true) as HTMLElement;
        wolfClone.style.position = 'absolute';
        wolfClone.style.left = `${boundingRect.left}px`;
        wolfClone.style.top = `${boundingRect.top}px`;
        document.body.appendChild(wolfClone);

        const wolfAnimation = wolfClone.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }],
          {
            duration: 1000,
            iterations: 1,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        );

        wolfAnimation.onfinish = () => {
          this.checkCollisionsWithWolves();
          document.body.removeChild(wolfClone);
        };
      });
      emoticonContainer.removeChild(wolf);
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
    if (this.gameOver) return;

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
            this.addElfEmoji();
          }
        });
      });
    }
  }

  checkCollisionsWithWolves() {
    if (this.gameOver) return;

    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      const wolves = document.querySelectorAll(
        '.wolf'
      ) as NodeListOf<HTMLElement>;
      const emoticons = emoticonContainer.querySelectorAll(
        '.emoticon'
      ) as NodeListOf<HTMLElement>;

      wolves.forEach((wolf) => {
        const wolfRect = wolf.getBoundingClientRect();
        emoticons.forEach((emoticon) => {
          const emoticonRect = emoticon.getBoundingClientRect();
          if (this.isCollision(wolfRect, emoticonRect)) {
            this.updatePointsWithWolves();
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

  isCollision(rect1: DOMRect, rect2: DOMRect): boolean {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  updatePoints() {
    this.points += 10;
    this.updatePointsDisplay();
    this.playPointSound();
  }

  updatePointsWithWolves() {
    this.points += 10;
    this.updatePointsDisplay();
    this.playPointSound();
    this.addWolfEmoji();
  }

  updatePointsDisplay() {
    const pointsElement = document.getElementById('points');
    if (pointsElement) {
      pointsElement.textContent = this.points.toString();
      this.checkWinCondition();
    }
  }

  playPointSound() {
    this.pointSound.play();
  }

  addWolfEmoji() {
    const wolfContainer = document.getElementById('wolfContainer');
    if (wolfContainer) {
      const wolfEmoji = document.createElement('span');
      wolfEmoji.className = 'wolf-emoji';
      wolfEmoji.textContent = '🐺';
      wolfContainer.appendChild(wolfEmoji);

      if (wolfContainer.children.length > 10) {
        wolfContainer.removeChild(wolfContainer.firstChild!);
      }
    }
  }

  addElfEmoji() {
    const elfContainer = document.getElementById('elfContainer');
    if (elfContainer) {
      const elfEmoji = document.createElement('span');
      elfEmoji.className = 'elf-emoji';
      elfEmoji.textContent = '🧚';
      elfContainer.appendChild(elfEmoji);

      if (elfContainer.children.length > 5) {
        elfContainer.removeChild(elfContainer.firstChild!);
      }
    }
  }

  checkWinCondition() {
    if (this.points >= 5000) {
      this.gameOver = true;
      this.stopAllAnimations();
      this.disableButtons();

      const winMessage = document.getElementById('winMessage');
      if (winMessage) {
        this.createAsterisk(
          winMessage,
          winMessage.offsetLeft,
          winMessage.offsetTop
        );
        winMessage.style.display = 'block';
      }

      const restartButton = document.getElementById('restartButton');
      if (restartButton) {
        restartButton.style.display = 'inline';
      }
    }
  }

  stopAllAnimations() {
    const animations = document.querySelectorAll(
      '*[style*="animation"]'
    ) as NodeListOf<HTMLElement>;
    animations.forEach((animation) => {
      animation.style.animationPlayState = 'paused';
    });
  }

  disableButtons() {
    const buttons = document.querySelectorAll(
      'button'
    ) as NodeListOf<HTMLButtonElement>;
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }

  restartGame() {
    this.points = 0;
    this.updatePointsDisplay();
    this.gameOver = false;

    const buttons = document.querySelectorAll(
      'button'
    ) as NodeListOf<HTMLButtonElement>;
    buttons.forEach((button) => {
      button.disabled = false;
    });

    const emoticonContainer = document.getElementById('emoticonContainer');
    if (emoticonContainer) {
      emoticonContainer.innerHTML = '';
    }

    const wolfContainer = document.getElementById('wolfContainer');
    if (wolfContainer) {
      wolfContainer.innerHTML = '';
    }

    const elfContainer = document.getElementById('elfContainer');
    if (elfContainer) {
      elfContainer.innerHTML = '';
    }

    const winMessage = document.getElementById('winMessage');
    if (winMessage) {
      winMessage.style.display = 'none';
    }

    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
      restartButton.style.display = 'none';
    }

    this.startGame();
  }

  displayWinMessage() {
    const winMessage = document.getElementById('winMessage');
    if (winMessage) {
      winMessage.textContent = '🎉 You Win! 🎉';
      winMessage.style.color = 'green';
      winMessage.style.fontSize = '24px';
    }
  }

  displayGameOverMessage() {
    const gameOverMessage = document.getElementById('gameOverMessage');
    if (gameOverMessage) {
      gameOverMessage.textContent = 'Game Over!';
      gameOverMessage.style.color = 'red';
      gameOverMessage.style.fontSize = '24px';
    }
    this.playLaughSound();
  }

  playLaughSound() {
    this.laughSound.play();
  }
}
