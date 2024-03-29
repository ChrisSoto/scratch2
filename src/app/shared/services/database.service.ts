import { Injectable } from '@angular/core';
import {
  addDoc, CollectionReference, deleteDoc, doc, getDoc, getCountFromServer, onSnapshot,
  query, setDoc, updateDoc, collectionData, serverTimestamp, QueryConstraint,
  collection, Firestore, DocumentReference, DocumentSnapshot, DocumentData, enableIndexedDbPersistence
} from '@angular/fire/firestore';
import { getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { catchError, combineLatest, from, map, mergeMap, Observable, of, take, tap, throwError, Unsubscribable } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { PaginatedCollection } from '../interface/pagination.model';

// yoinked from 
// https://gist.github.com/evlymn/3369172043d18609fca4e5d426dc1cd7

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private firestore: Firestore,
    private auth: AuthService) {
    // disable till this is made main database service
    // this.enableIndexedDbPersistence();
  }

  createId(): string {
    return doc(collection(this.firestore, 'id')).id;
  }

  private async listPaginate<T>(path: string, ...q: QueryConstraint[]) {
    const coll = collection(this.firestore, path) as CollectionReference<T>;
    const first = query<T, DocumentData>(coll, ...q);
    const documentSnapshots = await getDocs(first);
    const count = await getCountFromServer(coll);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    return {
      query: first,
      next: lastVisible,
      count: count,
    };
  }

  list<T>(path: string, ...q: QueryConstraint[]): Observable<T[]> {
    return collectionData(
      query(
        collection(this.firestore, path) as CollectionReference<T & { id: string }>,
        ...q
      ), { idField: 'id' }
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(`Database List did not work: ${err}`));
      })
    );
  }

  listCustomId<T>(path: string, idField: string, ...q: QueryConstraint[]): Observable<T[]> {
    return collectionData(
      query(
        collection(this.firestore, path) as CollectionReference<T & { [key: string]: string }>,
        ...q
      ), { idField: idField }
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(`Database List Custom Id did not work: ${err}`));
      })
    );
  }

  private getId(idField: string): string {
    return idField ? idField : 'id';
  }

  listPaginated<T>(path: string, ...q: QueryConstraint[]): Observable<PaginatedCollection<T>> {
    return from(this.listPaginate<T>(path, ...q))
      .pipe(
        mergeMap(data => combineLatest([
          // @ts-ignore
          collectionData<T & { id: string }, string>(data.query, { idField: 'id' }),
          of(data.next),
          of(data.count.data().count),
        ])),
        map((val) => {
          return {
            data: val[0],
            next: val[1],
            count: val[2],
          }
        }),
        catchError(err => {
          return throwError(() => new Error(`Database List Paginated did not work: ${err}`));
        })
      )
  }

  add(path: string, data: any): Promise<DocumentReference<any>> {
    const meta = {
      createdBy: this.auth.user$.value?.uid,
      created: serverTimestamp()
    };

    data = Object.assign(data, meta);

    const ref = collection(this.firestore, path);
    return addDoc(ref, this.setUndefinedValuesToNull(data))
      .catch(err => {
        return new Promise(() => new Error(`Database List did not work: ${err}`));
      });
  }

  set(path: string, data: any): Promise<void> {
    const meta = {
      createdBy: this.auth.user$.value?.uid,
      created: serverTimestamp()
    };

    data = Object.assign(data, meta);

    const ref = doc(this.firestore, path);
    return setDoc(ref, this.setUndefinedValuesToNull(data))
      .catch(err => {
        return new Promise(() => new Error(`Database List did not work: ${err}`));
      });
  }

  get(path: string): Promise<DocumentSnapshot<DocumentData>> {
    const ref = doc(this.firestore, path);
    return getDoc(ref)
      .catch(err => {
        return new Promise(() => new Error(`Database List did not work: ${err}`));
      });
  }

  // https://stackoverflow.com/questions/71324214/firebase-v9-modular-how-do-you-use-onsnapshot-to-return-an-observable
  observe<T>(path: string): Observable<DocumentSnapshot<DocumentData>> {
    const ref = doc(this.firestore, path);
    return new Observable((observer) => {
      return onSnapshot(ref,
        (snapshot => observer.next(snapshot)),
        (error => observer.error(error.message))
      );
    });
  }

  update(path: string, data: any): Promise<void> {
    const meta = {
      updated: serverTimestamp(),
      updatedBy: this.auth.user$.value?.uid,
    };

    data = Object.assign(data, meta);

    const ref = doc(this.firestore, path);
    return updateDoc(ref, this.setUndefinedValuesToNull(data))
      .catch(err => {
        return new Promise(() => new Error(`Database List did not work: ${err}`));
      });
  }

  delete(path: string): Promise<void> {
    const ref = doc(this.firestore, path);
    return deleteDoc(ref)
      .catch(err => {
        return new Promise(() => new Error(`Database List did not work: ${err}`));
      });
  }

  private enableIndexedDbPersistence() {

    enableIndexedDbPersistence(this.firestore)
  }

  private setUndefinedValuesToNull(data: any) {
    Object.keys(data).filter(k => data[k] == undefined).forEach(k => data[k] = null);
    return data;
  }
}