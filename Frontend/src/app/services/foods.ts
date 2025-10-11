import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Foods {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>('http://localhost:3000/api/foods');
  }

  getAllFoodsBySerachTerm(searchTerm:string): Observable<Food[]>{
    return this.http.get<Food[]>(`http://localhost:3000/api/foods/search/${searchTerm}`);
}
getAllTags():Observable<Tag[]>{
  return this.http.get<Tag[]>('http://localhost:3000/api/foods/tags');
}

getAllFoodsByTag(tag:string):Observable<Food[]>{
  return tag=='All'? this.http.get<Food[]>('http://localhost:3000/api/foods'):
  this.http.get<Food[]>(`http://localhost:3000/api/foods/tag/${tag}`);
}

getFoodById(foodId:string):Observable<Food>{
  return this.http.get<Food>(`http://localhost:3000/api/food/${foodId}`); 
}
}
