import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authRequest = req.clone({
      headers: req.headers.set('Session', '12345678'),
    });
    console.log('inside');
    return next.handle(authRequest).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log('Server response');
        }
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) console.log('error status 2000');
          }
        };
      }),
      catchError((err) => {
        console.log('error');
        return of(err);
      })
    );
  }
}
