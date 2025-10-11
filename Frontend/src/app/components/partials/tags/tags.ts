import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { Foods } from '../../../services/foods';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tags',
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.html',
  styleUrl: './tags.css'
})
export class Tags {
  tags?:Tag[];
  constructor(private foodsService:Foods){
    foodsService.getAllTags().subscribe(servertags=>{
      this.tags=servertags;
    });
  }

}
