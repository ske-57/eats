import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 16px; font-family: sans-serif; color: var(--tg-text-color);">
      <div style="background-color: var(--tg-secondary-bg-color); border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <h1 style="font-size: 22px; font-weight: 600; margin-bottom: 16px;">Поддержка</h1>
        <p style="font-size: 15px; margin-bottom: 12px;">
          Если у вас возникли вопросы или проблемы — мы всегда на связи и готовы помочь.
        </p>
        <p style="font-size: 15px;">
          📬 Пишите нам прямо в Telegram:
          <a href="https://t.me/senya57k" style="color: var(--tg-link-color);">It Eats Support</a>
        </p>

        <div style="margin-top: 24px; text-align: center;">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2972/2972810.png" 
            alt="Поддержка"
            width="100"
            height="100"
            style="opacity: 0.85;"
          />
        </div>
      </div>
    </div>
  `,
})
export class SupportComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router);

  constructor() {
    this.navigateToRestourantsPage = this.navigateToRestourantsPage.bind(this);
  }

  ngOnInit() {
    if (this.tg) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(this.navigateToRestourantsPage);

      this.tg.MainButton.show();
      this.tg.MainButton.onClick(this.navigateToRestourantsPage);
      this.tg.MainButton.setText('К списку ресторанов');
    } else {
      this.printTelegramMiniAppUnavailable();
    }
  }

  ngOnDestroy(): void {
    if (this.tg) {
      this.tg.BackButton.hide();
      this.tg.BackButton.offClick(this.navigateToRestourantsPage);

      this.tg.MainButton.hide();
      this.tg.MainButton.offClick(this.navigateToRestourantsPage);
    } else {
      this.printTelegramMiniAppUnavailable();
    }
  }

  navigateToRestourantsPage() {
    this.router.navigate(['/']);
  }

  printTelegramMiniAppUnavailable() {
    console.error('tg mini app is unavailable!');
  }
}
