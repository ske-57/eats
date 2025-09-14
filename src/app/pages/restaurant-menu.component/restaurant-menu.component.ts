import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-menu.component',
  imports: [],
  templateUrl: './restaurant-menu.component.html',
  styleUrl: './restaurant-menu.component.css'
})
export class RestaurantMenuComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router);
  cartLength: number = 0;

  constructor() {
    this.navigateToRestaurantsList = this.navigateToRestaurantsList.bind(this);
  }

  public ngOnInit(): void {
    this.tg.BackButton.show();
    this.tg.BackButton.onClick(this.navigateToRestaurantsList);

    this.tg.MainButton.show();
    this.tg.MainButton.setText(`Моя корзина (${this.cartLength})`);
  }

  public ngOnDestroy(): void {
    this.tg.BackButton.hide();
    this.tg.BackButton.offClick(this.navigateToRestaurantsList);

    this.tg.MainButton.hide();
  }

  navigateToRestaurantsList(): void {
    this.router.navigate(['/']);
  }
}
