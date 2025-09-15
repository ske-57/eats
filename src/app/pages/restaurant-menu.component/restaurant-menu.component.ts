import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '../../api';
import { RestaurantService } from '../../services/restaurant.service/restaurant.service';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-menu.component',
  standalone: true,
  imports: [CommonModule],
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
  cartService = inject(CartService);

  restaurantId: number | undefined;
  menuItems: MenuItem[] = [];
  cartLength: number = 0;
  cart: MenuItem[] = [];
  basePicturePath = environment.apiUrl;
  activeButtons: Set<number> = new Set();

  constructor() {
    this.navigateToRestaurantsList = this.navigateToRestaurantsList.bind(this);
    this.navigateToCart = this.navigateToCart.bind(this);
  }

  public ngOnInit(): void {
    this.restaurantId = this.parseIdFromUrl();

    this.getRestaurantMenuData();

    this.tg.BackButton.show();
    this.tg.BackButton.onClick(this.navigateToRestaurantsList);

    this.tg.MainButton.show();
    this.tg.MainButton.setText(`Моя корзина (${this.cartLength})`);
    this.tg.MainButton.onClick(this.navigateToCart);
  }

  public ngOnDestroy(): void {
    this.tg.BackButton.hide();
    this.tg.BackButton.offClick(this.navigateToRestaurantsList);

    this.tg.MainButton.hide();
    this.tg.MainButton.onClick(this.navigateToCart);
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

  addToCart(menuItem: MenuItem): void {
    this.cartService.addItemToCart(menuItem);
    this.activeButtons.add(menuItem.id);
    this.cartLength = this.cartService.getItems().length;
    this.tg.MainButton.setText(`Корзина (${this.cartLength})`);
    this.cdr.detectChanges();

    setTimeout(() => {
      this.activeButtons.delete(menuItem.id);
      this.cdr.detectChanges();
    }, 1000);
    console.log("Added to cart from restaurant menu. Cart data: ", this.cartService.getItems());
  }

  onAddToCart(event: Event, item: MenuItem): void {
    event.stopPropagation();
    this.addToCart(item);
  }

  navigateToItemDetail(itemId: number): void {
    this.router.navigate([`item/${itemId}`]);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToRestaurantsList(): void {
    this.router.navigate(['/']);
  }
}
