import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Restaurant } from '../../api';
import { RestaurantService } from '../../services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-restaurants-list.component',
  imports: [],
  templateUrl: './restaurants-list.component.html',
  styleUrl: './restaurants-list.component.css'
})
export class RestaurantsListComponent {
  mockRestaurants: Restaurant[] = [
    {
      id: 1,
      name: "Tacos",
      address: "Улица Пушкина, д. Колотушкина",
      schedule: "8:00 - 18:00",
    },
    {
      id: 2,
      name: "Чайхона",
      address: "Улица Горького, д. Сосольного",
      schedule: "9:00 - 20:00",
    }
  ];
  restaurants: Restaurant[] = [];
  private tg = inject(TelegramService);
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.navigateToSupport = this.navigateToSupport.bind(this);

  };

  ngOnInit(): void {
    this.getUserData();
    this.getRestaurantsData();
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
      if (!userInfo) {
        console.error('User unfo init data is not available', userInfo);
      }
    } else {
      this.printTelegramMiniAppUnavailable()
    }

  }

  getRestaurantsData(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Geeting all restaurants went wrong\n', error);
      }
    })
  }

  navigateToSupport() {
    this.router.navigate(['/support'])
  }

  navigateToRestaurantMenu(restaurantId: number) {
    this.router.navigate(['/menu', restaurantId]);
  }

  printTelegramMiniAppUnavailable() {
    console.error('TG mini app is unavailable!');
  }
}
