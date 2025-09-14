import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '../../api';
import { RestaurantService } from '../../services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-restaurant-menu.component',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-menu.component.html',
  styleUrl: './restaurant-menu.component.css'
})
export class RestaurantMenuComponent implements OnInit, OnDestroy {
  // mockMenuItems: MenuItem[] = [
  //   {
  //     id: 1,
  //     restaurant_id: 1,
  //     name: 'Классическое с говядиной',
  //     description: 'Супер пупер',
  //     price: 290.00
  //   },
  //   {
  //     id: 2,
  //     restaurant_id: 1,
  //     name: 'Классическое с курицей',
  //     description: 'Da-da good',
  //     price: 350.00
  //   }
  // ];

  tg = inject(TelegramService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  restaurantService = inject(RestaurantService);
  cdr = inject(ChangeDetectorRef);

  restaurantId: number | undefined;
  menuItems: MenuItem[] = [];
  cartLength: number = 0;
  cart: any = [];

  constructor() {
    this.navigateToRestaurantsList = this.navigateToRestaurantsList.bind(this);
  }

  public ngOnInit(): void {
    this.restaurantId = this.parseIdFromUrl();

    this.getRestaurantMenuData();

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

  getRestaurantMenuData(): void {
    if (this.restaurantId) {
      this.restaurantService.getRestaurantMenu(this.restaurantId).subscribe({
        next: (data) => {
          this.menuItems = data;
          this.cdr.detectChanges();
        }
      })
    } else {
      console.error('Cannot get restauratn menu because of restaurant id is null');
    }
  }


  parseIdFromUrl(): number {
    const idStr = this.route.snapshot.paramMap.get('restaurantId');
    if (typeof idStr === 'string') {
      return parseInt(idStr);
    } else {
      return -1;
    }
  }

  navigateToRestaurantsList(): void {
    this.router.navigate(['/']);
  }
}
