import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentSnapshot, QueryConstraint, where } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { ChurchHymn } from '../interface/ChurchSlideshow.interface';
import { Observable, filter, map, take, tap } from 'rxjs';

@Injectable()
export class HymnService {

  private database = inject(DatabaseService);

  private path = 'opc_hymns';

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  read$(hymnNumber: string): Observable<ChurchHymn> {
    return this.list$(where('number', '==', hymnNumber))
      .pipe(
        filter(data => {
          return data.length > 0;
        }),
        map(data => {
          return data[0]
        })
      )
  }

  list$(...q: QueryConstraint[]): Observable<ChurchHymn[]> {
    return this.database.list<ChurchHymn>(this.path, ...q);
  }

}
