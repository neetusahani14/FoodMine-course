import { Component } from '@angular/core';
import { Title } from "../../partials/title/title";
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../../shared/validators/password_match';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { TextInput } from "../../partials/text-input/text-input";
import { DefaultButton } from "../../partials/default-button/default-button";

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, Title, TextInput, DefaultButton, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {

  registerForm!:FormGroup;
  isSubmitted=false;
  returnUrl:string='';

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit():void{
    this.registerForm=this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(4)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', [Validators.required]],
      address:['', [Validators.required, Validators.minLength(10)]],
    },
  {
    validators:passwordMatchValidator('password', 'confirmPassword')
  });

  this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';  
    
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted=true;
    if(this.registerForm.invalid) return; 
   
    const fv=this.registerForm.value;
    const user :IUserRegister={
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };
    this.userService.register(user).subscribe(_ => {
     this.router.navigateByUrl(this.returnUrl);
    });
  }


}
