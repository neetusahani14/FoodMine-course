
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';   // ✅ import your model

@Injectable({
  providedIn: 'root'
})
export class OrderService {   // ✅ service class name fixed

  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {   // ✅ use model type
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {   // ✅ new method to get new order
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order: Order): Observable<string> { 
    return this.http.post<string>(ORDER_PAY_URL, order);
  }

  trackOrderById(id:number): Observable<Order> {   // ✅ new method to track order by ID
    return this.http.get<Order>(`${ORDER_TRACK_URL}${id}`);
  }
}
