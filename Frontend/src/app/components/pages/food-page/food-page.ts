import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { Foods } from '../../../services/foods';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 CommonModule
@Component({
  selector: 'app-food-page',
  imports: [ CommonModule, RouterModule, NgbRating ],
  templateUrl: './food-page.html',
  styleUrl: './food-page.css'
})
export class FoodPage {
  food!:Food;
  constructor(activatedRoute:ActivatedRoute, foodsService:Foods){
    activatedRoute.params.subscribe(params=>{
      if(params['id'])
        this.food= foodsService.getFoodById(params['id']);

    });
  }

}
