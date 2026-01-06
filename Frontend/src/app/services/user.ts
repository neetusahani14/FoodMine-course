// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, tap} from 'rxjs';
// import { User  } from '../shared/models/User';
// import { HttpClient } from '@angular/common/http';
// import { IUserLogin } from '../shared/interfaces/IUserLogin';
// import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
// import { ToastrService } from 'ngx-toastr';
// import { IUserRegister } from '../shared/interfaces/IUserRegister';

// const USER_KEY = 'User';
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
//   public userObservable: Observable<User>;
//   constructor(private http: HttpClient, private toastrService: ToastrService)
//   {
//     this.userObservable = this.userSubject.asObservable();
//   }

//   // login(userLogin:IUserLogin): Observable<User> {
//   //   return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
//   //     tap({
//   //       next: (user) => {
//   //         this.setUserToLocalStorage(user);
//   //        this.userSubject.next(user);
//   //        this.toastrService.success(`Welcome back ${user.name}!`, 'Login Successful');
//   //       },
//   //       error: (errorResponse) => {
//   //         this.toastrService.error(errorResponse.error, 'Login Failed');
//   //       }
//   //     })
//   //   );
//   // }

//   public get currentUser(): User {
//     return this.userSubject.value;
//   }

//   login(userLogin: IUserLogin): Observable<User> {
//   return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
//     tap({
//       next: (user) => {
//         this.setUserToLocalStorage(user);
//         this.userSubject.next(user);
//         this.toastrService.success(`Welcome back ${user.name}!`, 'Login Successful');
//       },
//       error: (errorResponse) => {
//         // ✅ Use the message property
//         this.toastrService.error(errorResponse.error.message, 'Login Failed');
//       }
//     })
//   );
// }

// register(userRegister: IUserRegister): Observable<User> {
//   return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
//     tap({
//       next: (user) => {
//         this.setUserToLocalStorage(user);
//         this.userSubject.next(user);
//         this.toastrService.success(`Welcome ${user.name}!`, 
//           'Registration Successful');
//       },
//       error: (errorResponse) => {
//         this.toastrService.error(errorResponse.error.message, 
//           'Registration Failed');
//       }
//     })
//   );
// }

//   logout(){
//     this.userSubject.next(new User());
//     localStorage.removeItem(USER_KEY);
//     window.location.reload();
//   }

//   private setUserToLocalStorage(user: User) {
//     localStorage.setItem(USER_KEY, JSON.stringify(user));
//   }

//   private getUserFromLocalStorage(): User {
//     const userJson = localStorage.getItem(USER_KEY);
//     if (userJson) return JSON.parse(userJson) as User;
//     return new User();
//   }
 
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  // login(userLogin: IUserLogin): Observable<User> {
  //   return this.http.post<{ user: User; token: string }>(USER_LOGIN_URL, userLogin).pipe(
  //     map(res => ({ ...res.user, token: res.token } as User)),
  //     tap({
  //       next: (user) => {
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user);
  //         this.toastrService.success(`Welcome back ${user.name}!`, 'Login Successful');
  //       },
  //       error: (errorResponse) => {
  //         this.toastrService.error(errorResponse.error.message, 'Login Failed');
  //       }
  //     })
  //   );
  // }
login(userLogin: IUserLogin): Observable<User> {
  return this.http.post<any>(USER_LOGIN_URL, userLogin).pipe(
    map(res => {
      console.log("Login API response:", res); // ✅ Debug log
      const user: User = { ...res.user, token: res.token };
      return user;
    }),
    tap({
      next: (user) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(`Welcome back ${user.name}!`, 'Login Successful');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error.message || "Login Failed", 'Login Failed');
      }
    })
  );
}

  // register(userRegister: IUserRegister): Observable<User> {
  //   return this.http.post<{ user: User; token: string }>(USER_REGISTER_URL, userRegister).pipe(
  //     map(res => ({ ...res.user, token: res.token } as User)),
  //     tap({
  //       next: (user) => {
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user);
  //         this.toastrService.success(`Welcome ${user.name}!`, 'Registration Successful');
  //       },
  //       error: (errorResponse) => {
  //         this.toastrService.error(errorResponse.error.message, 'Registration Failed');
  //       }
  //     })
  //   );
  // }

  register(userRegister: IUserRegister): Observable<User> {
  return this.http.post<any>(USER_REGISTER_URL, userRegister).pipe(
    map(res => {
      console.log("Register API response:", res);
      const user: User = { ...res.user, token: res.token };
      return user;
    }),
    tap({
      next: (user) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(`Welcome ${user.name}!`, 'Registration Successful');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error.message || "Registration failed", 'Error');
      }
    })
  );
}

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}