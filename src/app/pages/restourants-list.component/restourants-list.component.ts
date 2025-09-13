import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-restourants-list.component',
  imports: [],
  templateUrl: './restourants-list.component.html',
  styleUrl: './restourants-list.component.css'
})
export class RestourantsListComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router);
  fileName = environment.fileName;

  constructor() {
    this.navigateToSupport = this.navigateToSupport.bind(this);
    this.getUserData();
  };

  ngOnInit(): void {
    console.info(this.fileName);
    if (this.tg) {
      this.tg.MainButton.show();
      this.tg.MainButton.setText('Написать нам!');
      this.tg.MainButton.onClick(this.navigateToSupport);
    } else {
      this.printTelegramMiniAppUnavailable();
    }
  }

  ngOnDestroy(): void {
    if (this.tg) {
      this.tg.MainButton.hide();
      this.tg.MainButton.offClick(this.navigateToSupport);
    }
  }

  getUserData() {
    if (this.tg) {
      const userInfo = this.tg.getUserData();
      const json = {
        "initData": userInfo,
      }
      if (userInfo) {
        console.info('User info: ', json);
      } else {
        console.error('User data not available', json);
      }
    } else {
      this.printTelegramMiniAppUnavailable()
    }

  }

  navigateToSupport() {
    this.router.navigate(['/support'])
  }

  printTelegramMiniAppUnavailable() {
    console.error('tg mini app is unavailable!');
  }
}
