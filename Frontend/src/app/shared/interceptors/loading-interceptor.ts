// import { HttpInterceptorFn } from '@angular/common/http';
// import { Inject } from '@angular/core';

// var pendingRequests = 0;

// export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
// const loadingService = Inject('LoadingService');
// pendingRequests++;
// loadingService.show();
//   return next(req);
// };


import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingItem } from '../../services/loading-item';
import { tap } from 'rxjs';

let pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingItem);
  loadingService.showLoading();
  pendingRequests++;

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          pendingRequests--;
          if (pendingRequests === 0) loadingService.hideLoading();
        }
      },
      error: () => {
        pendingRequests--;
        if (pendingRequests === 0) loadingService.hideLoading();
      }
    })
  );
};