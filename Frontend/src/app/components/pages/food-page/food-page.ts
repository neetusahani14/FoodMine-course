import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { Foods } from '../../../services/foods';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Carts } from '../../../services/carts';
import { NotFound } from "../../partials/not-found/not-found";
 CommonModule
@Component({
  selector: 'app-food-page',
  imports: [CommonModule, RouterModule, NgbRating, NotFound],
  templateUrl: './food-page.html',
  styleUrl: './food-page.css'
})
export class FoodPage {
  food!:Food;
  constructor(activatedRoute:ActivatedRoute, foodsService:Foods,
    private cartService: Carts, private router:Router){
    activatedRoute.params.subscribe(params=>{
      if(params['id'])
      foodsService.getFoodById(params['id']).subscribe(food=>{
        this.food=food;
      });
    });
  }
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
