import { Routes } from '@angular/router';
import { SupportComponent } from './pages/support.component/support.component';
import { RestaurantsListComponent } from './pages/restaurants-list.component/restaurants-list.component';
import { RestaurantCatalogComponent } from './pages/restaurant-catalog.component/restaurant-catalog.component';

export const routes: Routes = [

    { path: '', component: RestaurantsListComponent, pathMatch: 'full' },
    { path: 'list', component: RestaurantCatalogComponent },
    { path: 'support', component: SupportComponent },
];
