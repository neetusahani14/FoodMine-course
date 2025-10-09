import { Component, Input } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { Carts } from '../../../services/carts';
import { CartItem } from '../../../shared/models/CartItem';
import { Title } from '../../partials/title/title';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { NotFound } from "../../partials/not-found/not-found";

@Component({
  selector: 'app-cart-page',
   standalone: true,
  imports: [Title, CommonModule, RouterLink, NotFound],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPage {
   @Input() visible: boolean = false;
  cart!: Cart;
  constructor( private cartsService: Carts ) {
    this.cartsService.getCartObservable().subscribe(cart => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartsService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string): void {
    const quantity = parseInt(quantityInString);
    if (quantity < 1) return;
    this.cartsService.changeQuantity(cartItem.food.id, quantity);
  }
}
