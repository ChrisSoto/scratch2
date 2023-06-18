import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { ChurchSlideshow } from '../interface/ChurchSlideshow.interface';
import { PaginatedCollection } from 'src/app/shared/interface/pagination.model';


@Injectable()
export class ChurchSlideshowService {

  path = 'opc_services';

  private database = inject(DatabaseService);
  private sortToQuery = inject(SortToQueryConstraintsService);

  create(system: ChurchSlideshow): Promise<DocumentReference<ChurchSlideshow>> {
    return this.database.add(this.path, system);
  }

  observe(id: string) {
    return this.database.observe<ChurchSlideshow>(this.path + '/' + id)
      .pipe(
        map(data => {
          let slideshow = data.data() as ChurchSlideshow;
          slideshow.id = data.id;
          return slideshow;
        })
      );
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  list$(sort?: GeneralQuery[]): Observable<ChurchSlideshow[]> {
    if (!sort) sort = [{ name: 'orderBy', field: 'created', direction: 'desc' }];
    return this.database.list(this.path, ...this.sortToQuery.convert(sort));
  }

  listPaginated$(sort?: GeneralQuery[]): Observable<PaginatedCollection<ChurchSlideshow>> {
    if (!sort) sort = [{ name: 'orderBy', field: 'created', direction: 'desc' }];
    return this.database.listPaginated(this.path, ...this.sortToQuery.convert(sort));
  }

  update(slideshow: Partial<ChurchSlideshow>): Promise<void> {
    return this.database.update(this.path + '/' + slideshow.id, slideshow);
  }

  remove(id: string): Promise<void> {
    return this.database.delete(this.path + '/' + id);
  }
}
