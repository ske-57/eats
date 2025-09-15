import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '../../api';
import { MenuItemService } from '../../services/menu-item.service/menu-item.service';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service/cart.service';

@Component({
  selector: 'app-menu-item-detail.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item-detail.component.html',
  styleUrl: './menu-item-detail.component.css'
})
export class MenuItemDetailComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  menuItemService = inject(MenuItemService);
  cartService = inject(CartService);

  menuItem: any = {};
  itemId: number | undefined;
  buttonActive: boolean = false;
  cartLength: number = 0;
  basePicturePath = environment.apiUrl;

  constructor() {
    this.navigateToRestaurantMenu = this.navigateToRestaurantMenu.bind(this);
    this.navigateToCart = this.navigateToCart.bind(this);
  }

  ngOnInit(): void {
    this.parseItemIdFromUrl();
    this.getItemDetailData();

    this.tg.BackButton.show();
    this.tg.BackButton.onClick(this.navigateToRestaurantMenu);

    this.tg.MainButton.show();
    this.tg.MainButton.setText(`Корзина (${this.cartLength})`);
    this.tg.MainButton.onClick(this.navigateToCart);
    this.refreshTgButton();

  }

  ngOnDestroy(): void {
    this.tg.BackButton.hide();
    this.tg.BackButton.offClick(this.navigateToRestaurantMenu);

    this.tg.MainButton.hide();
    this.tg.MainButton.offClick(this.navigateToCart);
  }

  addToCart(menuItem: MenuItem): void {
    this.cartService.addItemToCart(menuItem);
    this.buttonActive = true;
    this.refreshTgButton();

    setTimeout(() => {
      this.buttonActive = false;
      this.cdr.detectChanges();
    }, 350);
  }

  getItemDetailData(): void {
    if (this.itemId) {
      this.menuItemService.getItemDetailData(this.itemId).subscribe({
        next: (data) => {
          this.menuItem = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed getting item detail data: ', error);
        }
      })
    } else {
      console.error('Error getting item detail data. Item id is not a number.');
    }
  }

  parseItemIdFromUrl(): void {
    const itemIdStr = this.route.snapshot.paramMap.get('itemId');
    if (typeof itemIdStr === 'string') {
      this.itemId = parseInt(itemIdStr);
    }
  }

  refreshTgButton(): void {
    this.cartLength = this.cartService.getItems().length;
    this.tg.MainButton.setText(`Корзина (${this.cartLength})`);
    this.cdr.detectChanges();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToRestaurantMenu(): void {
    this.router.navigate([`/menu/${this.menuItem.restaurant_id}`])
  }
}
