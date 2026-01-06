/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // if you have routing
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './app/shared/interceptors/loading-interceptor';
import { authInterceptor } from './app/auth/auth-interceptor';



bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient( withInterceptors([loadingInterceptor])   ),
    provideHttpClient( withInterceptors([authInterceptor])   ),
    
    importProvidersFrom(ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
         timeOut: 3000
      }
    )),
    provideRouter(routes) // optional
  ]
});




function withInterceptorsFromDi(loadingInterceptor: unknown): import("@angular/common/http").HttpFeature<import("@angular/common/http").HttpFeatureKind> {
  throw new Error('Function not implemented.');
}
// import { bootstrapApplication } from '@angular/platform-browser';

// import {App} from './app/app';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';
// import { ToastrModule } from 'ngx-toastr';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';

// // if you have routing

// bootstrapApplication(App, {
//   providers: [
//     provideAnimations(),
//     importProvidersFrom(
//       ToastrModule.forRoot({
//         positionClass: 'toast-bottom-right',
//         timeOut: 3000
//       })
//     ),

//   ]
// });

