import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'; // Servicio donde tienes la lógica de autenticación
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor invocado')
    // Obtén el token JWT desde tu servicio de autenticación
    const token = localStorage.getItem('himalayaToken')?.toString()

    // Clona la solicitud para añadirle el encabezado Authorization si el token existe
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if(error.status == 200){
          console.log('pasa')
        }
        else if (error.status === 403) {
          console.error('Acceso denegado');
        }
        return throwError(() => error);
      }),
      finalize(() => {
        console.log('Solicitud finalizada');
      })
    );
  }
}
