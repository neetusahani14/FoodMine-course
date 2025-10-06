import { Component } from '@angular/core';
import { Foods } from '../../../services/foods';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Food } from '../../../shared/models/food';
import { CommonModule } from '@angular/common';
import { NgbRating } from "@ng-bootstrap/ng-bootstrap";
import { Search } from '../../partials/search/search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NgbRating,Search],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  foods:Food[]=[];
  constructor(foodsService:Foods, activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe(params=>{
      if(params['searchTerm'])
        this.foods= foodsService.getAllFoodsBySerachTerm(params['searchTerm']);  
      else
        this.foods=foodsService.getAll();
    });
  }

}
