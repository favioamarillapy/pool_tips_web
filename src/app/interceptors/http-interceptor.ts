import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private userService: UserService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.userService.getToken())
        .pipe(
            switchMap(token => {

                const useFormData = req.body instanceof FormData;

                if (token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }

                if (!req.headers.has('Content-Type') && !useFormData) {
                    req = req.clone({
                        setHeaders: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                }

                console.log(req.headers.get('Content-Type'));
                

                return next.handle(req).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // console.log('event--->>>', event);
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        if (error.error.success === false) {
                            console.log('Error 401');
                        } else {
                            console.log('Redirect 401');
                        }
                    }
                    return throwError(error);
                }));
            })
        );
    }
}