import { Component } from '@angular/core';
import { Carts } from '../../../services/carts';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  cartQuantity = 0;
  user!:User;
  constructor(cartService:Carts, private userService:UserService){ { 
    cartService.getCartObservable().subscribe(newcart=>{
      this.cartQuantity=newcart.totalCount;
    });
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    });
  } }

  ngOnInit() : void {

  }

  logout(){
    this.userService.logout();
  }
  get isAuth(){
    return this.user.token;
  }

  }

