import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  baseApi = `${environment.apiUrl}/menu`;

  constructor(private http: HttpClient) { }

  getItemDetailData(itemId: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.baseApi}/${itemId}`);
  }

}
