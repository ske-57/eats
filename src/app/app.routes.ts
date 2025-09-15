import { Routes } from '@angular/router';
import { SupportComponent } from './pages/support.component/support.component';
import { RestaurantsListComponent } from './pages/restaurants-list.component/restaurants-list.component';
import { RestaurantMenuComponent } from './pages/restaurant-menu.component/restaurant-menu.component';
import { MenuItemDetailComponent } from './pages/menu-item-detail.component/menu-item-detail.component';
import { CartComponent } from './pages/cart.component/cart.component';

export const routes: Routes = [

    { path: '', component: RestaurantsListComponent, pathMatch: 'full' },
    { path: 'menu/:restaurantId', component: RestaurantMenuComponent },
    { path: 'support', component: SupportComponent },
    { path: 'item/:itemId', component: MenuItemDetailComponent },
    { path: 'cart', component: CartComponent }
];
