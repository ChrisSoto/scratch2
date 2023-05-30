import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuard {

  constructor(
    private auth: AuthService,
    private router: Router) {

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLoggedIn() ? true : this.router.createUrlTree(['login']);
    // .pipe(
    //   tap(test => console.log(test)),
    //   map(loggedIn => {
    //     return loggedIn ? true : this.router.createUrlTree(['login'])
    //   })
    // )
  }

}
