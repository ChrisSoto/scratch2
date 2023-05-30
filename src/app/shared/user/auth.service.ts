import { Inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = Inject(Auth);

  user: User | null | undefined;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {
    this.auth.onAuthStateChanged((user: User | null) => {
      if (user) this.user$.next(user);
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
