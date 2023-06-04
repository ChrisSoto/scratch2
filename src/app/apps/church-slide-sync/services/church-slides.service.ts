import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChurchService } from '../interface/ChurchService.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Injectable()
export class ChurchSlidesService {

  private _services$: BehaviorSubject<ChurchService[]> = new BehaviorSubject<ChurchService[]>([]);
  list$: Observable<ChurchService[]> = this._services$.asObservable();

  path = 'opc_services';

  constructor(private database: DatabaseService) {
    this.list()
      .subscribe(services => {
        this._services$.next(services)
      });
  }

  create(service: ChurchService): Promise<DocumentReference<any>> {
    return this.database.add(this.path, service);
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  list(): Observable<ChurchService[]> {
    return this.database.list(this.path);
  }

  update(service: Partial<ChurchService>) {
    return this.database.update(this.path + '/' + service.id, service);
  }

  remove(id: string): Promise<void> {
    return this.database.delete(this.path + '/' + id);
  }
}
