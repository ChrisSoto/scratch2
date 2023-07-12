import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user-model';
import { DatabaseService } from '../services/database.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  db = inject(DatabaseService);

  private ref = 'users';

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

}
