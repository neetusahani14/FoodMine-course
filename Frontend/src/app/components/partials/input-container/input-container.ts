import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-container',
  imports: [CommonModule],
  templateUrl: './input-container.html',
  styleUrl: './input-container.css'
})
export class InputContainer {
@Input() 
label!: string;
@Input()
bgColor = 'white';

constructor() { }

}
