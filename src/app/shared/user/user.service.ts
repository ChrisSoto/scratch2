import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user-model';
import { DatabaseService } from '../services/database.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ref = 'users';

  constructor(
    public db: DatabaseService
  ) { }

  get index$(): Observable<User[]> {
    return this.db.list(this.ref);
  }

  show(uid: string) {
    return this.db.get(this.ref + '/' + uid);
  }

  create(user: User) {
    return this.db.set(this.ref + '/' + user.uid, user);
  }

  update(data: Partial<User>) {
    return this.db.update(this.ref + '/' + data.uid, data)
  }

  delete(uid: string) {
    return this.db.delete(this.ref + '/' + uid);
  }

  // load() {
  //   // const uid = this._auth.currentUser.uid;
  //   this.auth.onAuthStateChanged(user => {
  //     console.log('user', user);
  //     if (user) {
  //       this.db.get('users/'+user.uid)
  //         .then(res => {
  //           console.log(res.data());
  //         })
  //     }
  //   });
  // }

}
