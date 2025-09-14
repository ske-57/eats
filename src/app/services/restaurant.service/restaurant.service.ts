import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem, Restaurant } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseApi = `${environment.apiUrl}/restaurants`;

  constructor(private http: HttpClient) {
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.baseApi);
  }

  getRestaurantMenu(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseApi}/${restaurantId}/menu`);
  }

}
