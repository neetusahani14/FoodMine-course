import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  templateUrl: './title.html',
  styleUrl: './title.css'
})
export class Title {
[x: string]: any;
  @Input() title:string="";
  @Input() margin? ='1rem 0 1rem 0.2rem';
fontSize: any;

}
