import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { FoodPage } from './components/pages/food-page/food-page';
import { CartPage } from './components/pages/cart-page/cart-page';
import { LoginPage } from './components/pages/login-page/login-page';
import { RegisterPage } from './components/pages/register-page/register-page';
import { CheckoutPage } from './components/pages/checkout-page/checkout-page';
import { authGuard } from './auth/guards/auth-guard';
import { PaymentPage } from './components/pages/payment-page/payment-page';
import { OrderTrackPage } from './components/pages/order-track-page/order-track-page';


export const routes: Routes = [
    {path:'', component: Home},
    {path:'search/:searchTerm', component: Home},
    {path:'tag/:tag', component: Home},
    {path:'food/:id',component:FoodPage},
    {path:'cart-page', component: CartPage},
    {path:'login',component:LoginPage},
    {path:'register',component:RegisterPage},
    {path:'checkout', component: CheckoutPage, canActivate:[authGuard]},
    {path:'payment', component: PaymentPage, canActivate:[authGuard]},
    {path:'track/:orderId', component: OrderTrackPage, canActivate:[authGuard]},
    {path:'map',component:Map}

];

