// import { CanActivateFn, Router } from '@angular/router';
// import { UserService } from '../../services/user';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   const userService = inject(UserService);
//   const router = inject(Router);

//  if( this.userService.current)
// {
//   return true;
// }



// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.currentUser?.token) {
    return true;
  }

  return router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });

 
};