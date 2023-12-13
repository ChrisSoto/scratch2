import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { BehaviorSubject, filter, from, map, mergeMap, of } from 'rxjs';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  auth = inject(AuthService);
  userService = inject(UserService);

  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.auth.user$
      .pipe(
        filter(user => user !== null),
        mergeMap((user) => {
          if (user) {
            return from(this.userService.show(user.uid))
          } else {
            return of(null)
          }
        }),
        map(user => {
          if (user?.exists()) {
            return user.data() as User;
          } else {
            return null;
          }
        }),
        map(user => {
          // turn this into a case switch
          return (user && user.role === 'ADMIN') as boolean;
        })
      ).subscribe(isAdmin => this.isAdmin$.next(isAdmin))
  }

}
