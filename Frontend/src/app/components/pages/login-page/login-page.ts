import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from "../../partials/title/title";
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user';
import { ActivatedRoute, Router } from '@angular/router';
import { InputContainer } from "../../partials/input-container/input-container";
import { InputValidation } from '../../partials/input-validation/input-validation';
import { TextInput } from "../../partials/text-input/text-input";
import { DefaultButton } from "../../partials/default-button/default-button";

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, Title, TextInput, DefaultButton],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl= " ";
  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { } 

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];;
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login({email:this.formControls['email'].value,
          password:this.formControls['password'].value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    });
   
  }
}

