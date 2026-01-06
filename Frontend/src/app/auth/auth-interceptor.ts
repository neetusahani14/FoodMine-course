// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { UserService } from '../services/user';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const userService = inject(UserService);
//   const user = userService.currentUser;

//   if(user?.token){
//     req = req.clone({
//       setHeaders:{
//         access_token:user.token
//       }
//     })
//   }
//   return next(req);
// };

// import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Observable } from 'rxjs';
// import { UserService } from '../services/user';

// export const authInterceptor: HttpInterceptorFn = (
//   req: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<unknown>> => {
//   const userService = inject(UserService);
//   const user = userService.currentUser;

//   if (user?.token) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${user.token}`   // ✅ correct header format
//       }
      
//     });
//     console.log("Request headers:", req.headers);
//   }

//   return next(req);
// };


import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const userService = inject(UserService);
  const user = userService.currentUser;

  console.log("Current user:", user); // ✅ check user object

  if (user?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`   // ✅ correct header
      }
    });
//  console.log("Authorization header:", req.headers.get('Authorization'));
  } else {
    console.warn("No token found, request sent without Authorization header");
  }

  return next(req);
};