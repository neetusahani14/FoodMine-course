import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any={
  required: 'This field is required.',
  email: 'Please enter a valid email address.'
}
@Component({
  selector: 'input-validation',
  imports: [CommonModule],
  templateUrl: './input-validation.html',
  styleUrl: './input-validation.css'
})
export class InputValidation {
@Input()
control!:AbstractControl;
@Input()
showErrorsIfTouchedOnly:boolean = true;
errorMessages:string[] = [];
  constructor() { }

  ngOnChanges(){
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    });
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key=>VALIDATORS_MESSAGES[key]);
    
  }

}
