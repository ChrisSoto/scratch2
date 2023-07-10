import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { BehaviorSubject, Subject, mergeMap, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  // private userService = inject(UserService);

  user: User | null | undefined;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  isAuthenticated$: Subject<boolean> = new Subject();
  // isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        console.log('logged in: ', user);
        this.isAuthenticated$.next(true);
        this.user$.next(user);
      } else {
        this.isAuthenticated$.next(false);
      }
    });

   //  this.user$
   //    .pipe(
   //      mergeMap(user => {
   //        if (user) {
   //          return this.userService.show(user?.uid);
   //        } else {
   //          return of(null);
   //        }
   //      })
   //    )
   //    .subscribe(payload => {
   //      if (payload && payload.exists()) {
   //        const user = payload.data();
   //        if ('role' in user && user['role'] === 'ADMIN') {
   //          this.isAdmin$.next(true);
   //        }
   //      }
   //    })
  }

  isLoggedIn(): boolean {
    return this.user ? true : false;
    // return this._user$.asObservable()
    //   .pipe(
    //     map(user => {
    //       if (user && 'uid' in user) {
    //         return returnUid ? user.uid : true;
    //       } else {
    //         return false;
    //       }
    //     })
    //   )
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  deleteUser() {

  }
}
