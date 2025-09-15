import { Injectable } from '@angular/core';
import { MenuItem } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cartItemsKey';

  private cartItems: MenuItem[] = [];


  constructor() {
    this.loadFromSession();
  }

  private loadFromSession(): void {
    const data = sessionStorage.getItem(this.storageKey);
    if (data) {
      this.cartItems = JSON.parse(data);
    }
  }

  private saveToStorage() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  addItemToCart(menuItem: MenuItem): void {
    this.cartItems.push(menuItem);
    this.saveToStorage();
  }

  removeItemFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveToStorage();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveToStorage();
  }

  getItems(): MenuItem[] {
    return this.cartItems
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);

  }
}
