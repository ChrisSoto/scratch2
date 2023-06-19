import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuard {

  isAuthenticated$ = inject(AuthService).isAuthenticated$
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated$
      .pipe(
        map(auth => {
          return auth ? true : this.router.createUrlTree(['login']);
        })
      )
  }

}
