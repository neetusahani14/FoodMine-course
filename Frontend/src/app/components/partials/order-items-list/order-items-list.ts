import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-items-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './order-items-list.html',
  styleUrl: './order-items-list.css'
})
export class OrderItemsList {
  @Input()
  order!:Order;
  constructor() {}


}
