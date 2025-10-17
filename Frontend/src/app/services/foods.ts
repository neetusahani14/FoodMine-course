import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_BY_SEARCH_URLS, FOODS_URLS,FOOD_TAGS_URLS, FOOD_BY_ID_URLS, FOOD_BY_TAG_URLS } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class Foods {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URLS);
  }

  getAllFoodsBySerachTerm(searchTerm:string): Observable<Food[]>{
    return this.http.get<Food[]>(FOOD_BY_SEARCH_URLS + searchTerm);
}
getAllTags():Observable<Tag[]>{
  return this.http.get<Tag[]>(FOOD_TAGS_URLS);
}

getAllFoodsByTag(tag:string):Observable<Food[]>{
  return tag=='All'? this.http.get<Food[]>(FOODS_URLS):
  this.http.get<Food[]>(FOOD_BY_TAG_URLS + tag);
}

getFoodById(foodId:string):Observable<Food>{
  return this.http.get<Food>(FOOD_BY_ID_URLS + foodId); 
}
}
