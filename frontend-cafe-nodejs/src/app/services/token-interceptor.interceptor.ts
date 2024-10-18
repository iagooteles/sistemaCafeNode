import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.url);
        
        if (err.status === 401 || err.status === 403) {
          console.log('Acesso não autorizado');
          localStorage.clear();
          
          const router = inject(Router);
          router.navigate(['/']);
        }
      }
      return throwError(err);
    })
  );
};
