import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseApi = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseApi}/restaurants`);
  }

}
