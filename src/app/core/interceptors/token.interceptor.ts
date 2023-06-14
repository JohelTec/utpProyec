import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse 
} from '@angular/common/http';
import { AuthService } from '@app/shared/services/auth.service'
import { UserService } from '@app/shared/services/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.userService.isLoading.next(true);
    console.log("aqui maki")
    const token: string = this.authService.getSesionStorage('token');
    let req = request;

    if (token) {
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.userService.isLoading.next(false)
      }),
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/auth/login');
        }

        return throwError( err );

      })
    );
  }
}
