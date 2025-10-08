import { Component } from '@angular/core';
import { Carts } from '../../../services/carts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  cartQuantity = 0;
  constructor(cartService:Carts) { 
    cartService.getCartObservable().subscribe(newcart=>{
      this.cartQuantity=newcart.totalCount;
    });
  }

}
