import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service/cart.service';
import { MenuItem } from '../../api';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router);
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef);

  cartItems: MenuItem[] = [];
  basePicturePath = environment.apiUrl;
  buttonActive: boolean = false;


  constructor() {
    this.navigateToRestaurantsList = this.navigateToRestaurantsList.bind(this);
    this.navigateToPayment = this.navigateToPayment.bind(this);
  }



  ngOnInit(): void {
    this.uploadCartData();

    this.tg.BackButton.show();
    this.tg.BackButton.onClick(this.navigateToRestaurantsList);

    this.tg.MainButton.show();
    this.tg.MainButton.setText('Заказать готовку!')
    this.tg.MainButton.onClick(this.navigateToPayment);


  }

  ngOnDestroy(): void {
    this.tg.BackButton.hide();
    this.tg.BackButton.offClick(this.navigateToRestaurantsList);

    this.tg.MainButton.hide();
    this.tg.MainButton.offClick(this.navigateToPayment);
  }

  getTotalCartAmount(): number {
    return this.cartService.getTotalAmount();
  }

  uploadCartData(): void {
    this.cartItems = this.cartService.getItems();
    this.cdr.detectChanges();
    console.log("Upload cart data from cart. Cart data: ", this.cartService.getItems());
  }

  deleteItemFromCart(menuItem: MenuItem): void {
    this.cartItems.forEach((item) => {
      if (menuItem === item) {
        const indexToDelete = this.cartItems.indexOf(item);
        this.cartItems.splice(indexToDelete, 1);
        console.log('Item deleted: ', indexToDelete, item);
        console.log("Deleted item from cart. Cart data: ", this.cartService.getItems());
        return;
      }
    })
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.buttonActive = true;
    this.uploadCartData();
    this.cdr.detectChanges();
    console.log("Clear cart from cart page. Cart data: ", this.cartService.getItems());

    setTimeout(() => {
      this.buttonActive = false;
      this.cdr.detectChanges();
    }, 1000)
  }

  navigateToPayment(): void {
    this.router.navigate(['/']);
    this.cartService.clearCart();
    console.log("Clear cart by main button. Cart data: ", this.cartService.getItems());
    this.cdr.detectChanges();
  }

  navigateToRestaurantsList(): void {
    this.router.navigate(['/']);
  }

}
