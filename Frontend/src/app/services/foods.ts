import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class Foods {
  constructor() { }
  getAll():Food[]{
    return sample_foods;
  }

  getAllFoodsBySerachTerm(searchTerm:string): Food[]{
    return this.getAll().filter(food=>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
}
}
