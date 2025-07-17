import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ToastService } from '../services';
import { Router } from '@angular/router';

export function errorsHandleInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const toast = inject(ToastService);
  const router = inject(Router);
  return next(req.clone()).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 404 && err.error.processed) {
        router.navigate(['not-found']);
      } else if (err.status === 401 || err.status === 403) {
        router.navigate(['not-permitted']);
      } else {
        const message = err.error.message ?? err.message;
        toast.error(message, 'alert-circle-outline');
      }
      return EMPTY;
    })
  );
}
