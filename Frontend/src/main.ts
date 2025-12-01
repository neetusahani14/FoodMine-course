/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // if you have routing
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
         timeOut: 3000
      }
    )),
    provideRouter(routes) // optional
  ]
});



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

