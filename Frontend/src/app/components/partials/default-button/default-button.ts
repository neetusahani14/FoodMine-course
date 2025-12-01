import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'default-button',
  imports: [CommonModule],
  templateUrl: './default-button.html',
  styleUrl: './default-button.css'
})
export class DefaultButton {
  @Input()
  type: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  text: string = 'Submit';
  @Input()
  bgColor: string = '#ff0d00ff';
  @Input()
  textColor: string = 'white';
  @Input()
  fontSize: string = '1rem';
  @Input()
  widthRem = 10;
  @Output()
  onClick =new EventEmitter();

  constructor() { } 


}
