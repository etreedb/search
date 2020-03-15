import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpStatus {
  private requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean): void {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpListener implements HttpInterceptor {

  private httpCounter = 0;

  constructor(
    private status: HttpStatus
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          this.httpCounter --;
        } else {
          this.httpCounter ++;
        }
console.log('map ' + this.httpCounter);
        this.status.setHttpStatus(true);

        return event;
      }),
      catchError(error => {
        this.httpCounter --;

        return throwError(error);
      }),
      finalize(() => {
        if (this.httpCounter === 0) {
          this.status.setHttpStatus(false);
        }
        console.log('finalize ' + this.httpCounter);
      })
    );
  }
}
