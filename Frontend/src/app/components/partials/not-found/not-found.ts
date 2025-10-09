import { CommonModule,} from '@angular/common';
import { Component, Input , OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
  // @Input() visible: boolean = false;

  @Input()
  visible = false;
  @Input()
  notFoundMessage = "The page you are looking for is not found!";
  @Input()
  resetLinkText ="Go to Home Page";
  @Input()
  resetLinkRoute ="/";
  constructor() {}

}
