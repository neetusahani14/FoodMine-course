// import { Component } from '@angular/core';
// import { Order } from '../../../shared/models/Order';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import {  ToastrService } from 'ngx-toastr';
// import { Carts } from '../../../services/carts';
// import { UserService } from '../../../services/user';
// import { OrderService } from '../../../services/order';
// import { Title } from "../../partials/title/title";
// import { TextInput } from "../../partials/text-input/text-input";
// import { CommonModule } from '@angular/common';
// import { OrderItemsList } from '../../partials/order-items-list/order-items-list';
// import { Map } from '../../partials/map/map';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-checkout-page',
//   imports: [Title, TextInput, ReactiveFormsModule, CommonModule, OrderItemsList,Map],
//   templateUrl: './checkout-page.html',
//   styleUrl: './checkout-page.css'
// })
// export class CheckoutPage {
//   order: Order = new Order();
//   checkoutForm!: FormGroup;

//   constructor(cartService: Carts,
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     private toastrService: ToastrService,
//     private orderService: Order,
//     private router:Router
//   ) {
//     const cart = cartService.getCart();
//     this.order.items = cart.item;
//     this.order.totalPrice = cart.totalPrice;  
//   }

//   ngOnInit(): void {
//     let { name, address } = this.userService.currentUser;
//     this.checkoutForm = this.formBuilder.group({
//       name: [name, Validators.required],
//       address: [address, Validators.required]
//     });
//   }

//   get fc() {
//     return this.checkoutForm.controls;
//   }

//   createOrder() {
//     if (this.checkoutForm.invalid) {
//       this.toastrService.warning('Please fill in the required fields', 'Invalid Data');
//       return;
//     } 

//     if(!this.order.addressLatLng){
//         this.toastrService.warning('Please select your location on the map','Location');
//         return;
//     }

//     this.order.name = this.fc['name'].value;
//     this.order.address = this.fc['address'].value;  

//     this.orderService.create(this.order).subscribe({
//       next:()=>
//       {
//         this.router.navigateByUrl('/payment');
//       },
//       error:(errorResponse)=>
//       {
//           this.toastrService.error(errorResponse, 'Cart');
//       }

//     })
    
// }

// }

import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Carts } from '../../../services/carts';
import { UserService } from '../../../services/user';
import { OrderService } from '../../../services/order';   // ✅ correct import
import { Title } from "../../partials/title/title";
import { TextInput } from "../../partials/text-input/text-input";
import { CommonModule } from '@angular/common';
import { OrderItemsList } from '../../partials/order-items-list/order-items-list';
import { Map } from '../../partials/map/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,   // ✅ Angular 20 standalone component
  imports: [Title, TextInput, ReactiveFormsModule, CommonModule, OrderItemsList, Map],
  templateUrl: './checkout-page.html',
  styleUrls: ['./checkout-page.css']   // ✅ plural
})
export class CheckoutPage {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: Carts,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,   // ✅ inject service, not model
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.item;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill in the required fields', 'Invalid Data');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please select your location on the map', 'Location');
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      // error: (errorResponse) => {
      //   this.toastrService.error(errorResponse, 'Cart');
      // }
      error: (errorResponse) => {
  const message =
    errorResponse.error?.message ||   // backend JSON { message: '...' }
    errorResponse.message ||          // Angular HttpErrorResponse message
    'Unexpected error occurred';      // fallback

  this.toastrService.error(message, 'Cart');
}
    });
  }
}