import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);

  user: User | null | undefined;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  isAuthenticated$: Subject<boolean> = new Subject();

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
