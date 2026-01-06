import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../services/order';
import { Order } from '../../../shared/models/Order';
import { Carts } from '../../../services/carts';

declare var paypal:any;

@Component({
  selector: 'app-paypal-button',
  imports: [],
  templateUrl: './paypal-button.html',
  styleUrl: './paypal-button.css'
})
export class PaypalButton {
  @Input() order!: Order;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(private orderService:OrderService, private cartService:Carts, private router:Router, private toastrService:ToastrService){}

   ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId:any) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: (error:any) => {
              this.toastrService.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

  }

}
