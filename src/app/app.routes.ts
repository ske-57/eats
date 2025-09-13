import { Routes } from '@angular/router';
import { SupportComponent } from './pages/support.component/support.component';
import { RestaurantsListComponent } from './pages/restaurants-list.component/restaurants-list.component';
import { RestaurantMenuComponent } from './pages/restaurant-menu.component/restaurant-menu.component';

export const routes: Routes = [

    { path: '', component: RestaurantsListComponent, pathMatch: 'full' },
    { path: 'list', component: RestaurantMenuComponent },
    { path: 'support', component: SupportComponent },
];
