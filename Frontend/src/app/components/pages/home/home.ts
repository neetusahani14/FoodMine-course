import { Component } from '@angular/core';
import { Foods } from '../../../services/foods';
import { RouterLink } from '@angular/router';
import { Food } from '../../../shared/models/food';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  foods:Food[]=[];
  constructor(foodsService:Foods){
    this.foods=foodsService.getAll();
  }

}
