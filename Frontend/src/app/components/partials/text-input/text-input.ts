import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainer } from '../input-container/input-container';
import { InputValidation } from '../input-validation/input-validation';

@Component({
  selector: 'text-input',
  imports: [InputContainer, InputValidation, ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css'
})
export class TextInput {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsIfTouchedOnly:boolean = true;
  @Input()
  label!: string;
  @Input()
  text: 'text' | 'password' | 'email' = 'text';

  get formControl(){
    return this.control as FormControl;
  }
 
  constructor() { }

  ngOnInit(): void {  }

}
