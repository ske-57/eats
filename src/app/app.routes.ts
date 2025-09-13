import { Routes } from '@angular/router';
import { RestourantsListComponent } from './pages/restourants-list.component/restourants-list.component';
import { RestourantCatalogComponent } from './pages/restourant-catalog.component/restourant-catalog.component';

export const routes: Routes = [

    { path: '', component: RestourantsListComponent, pathMatch: 'full' },
    { path: 'list', component: RestourantCatalogComponent },
];
