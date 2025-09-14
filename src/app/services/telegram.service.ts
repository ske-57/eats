import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private window: any;
  tg: any;

  constructor(@Inject(DOCUMENT) private _document: any) {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
  }

  get MainButton(): TgButton {
    return this.tg.MainButton;
  }

  get BackButton(): TgButton {
    return this.tg.BackButton;
  }

  get InitData(): any {
    return this.tg.initData;
  }

  getUserData(): any {
    // console.log('DataUnsafe:', this.InitData); // Логирование данных Telegram
    const InitData = this.InitData;
    return InitData ? InitData : null;
  }

}
