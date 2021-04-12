import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Checkinterseptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    const request = req.clone({ params: req.params.set('value', 'asdsa') });
    return next.handle(request).pipe(
      map((res: HttpResponse<any>) => {
        res = res.clone({ body: { ...res.body, value: 'asdasdsa' } });
        console.log(res);
        return res;
      }),
      catchError((error) => {
        console.log(error);
        if (error.status === 401) {
          console.log('RRRRRRRRRRRRRRRRRRR');
        }
        return throwError(error);
      })
    );
  }
}
