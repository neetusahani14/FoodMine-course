import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order';
import { Router } from '@angular/router';
import { Title } from '../../partials/title/title';
import { OrderItemsList } from '../../partials/order-items-list/order-items-list';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Map } from '../../partials/map/map';
import { PaypalButton } from '../../partials/paypal-button/paypal-button';

@Component({
  selector: 'app-payment-page',
  imports: [Title, ReactiveFormsModule, CommonModule, OrderItemsList, Map,PaypalButton],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css'
})
export class PaymentPage {

  order:Order = new Order();

  constructor(private orderService:OrderService, router:Router){
    orderService.getNewOrderForCurrentUser().subscribe({
      next:(orderResponse)=>{
        this.order = orderResponse;
      },
      error:()=>{
        router.navigateByUrl('/checkout');
      }
    });

}
}
