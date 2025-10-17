import { Component } from '@angular/core';
import { Foods } from '../../../services/foods';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Food } from '../../../shared/models/food';
import { CommonModule } from '@angular/common';
import { NgbRating } from "@ng-bootstrap/ng-bootstrap";
import { Search } from '../../partials/search/search';
import { Tags } from '../../partials/tags/tags';
import { NotFound } from '../../partials/not-found/not-found';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NgbRating,Search, Tags,NotFound],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  foods:Food[]=[];
INR: string|undefined;
  constructor(foodsService:Foods, activatedRoute:ActivatedRoute){
    let foodObservable:Observable<Food[]>;
    activatedRoute.params.subscribe(params=>{
      if(params['searchTerm'])
       foodObservable= foodsService.getAllFoodsBySerachTerm(params['searchTerm']);  
      else if(params['tag'])
        foodObservable= foodsService.getAllFoodsByTag(params['tag']);
      else
        foodObservable=foodsService.getAll();

      foodObservable.subscribe(serverFoods=>{
        this.foods=serverFoods;
      });
    });
  }

}
