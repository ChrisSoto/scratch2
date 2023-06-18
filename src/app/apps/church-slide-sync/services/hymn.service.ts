import { Injectable, inject } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Injectable()
export class HymnService {

  private database = inject(DatabaseService);

  private path = 'opc_hymns';

  read(id: string) {
    return this.database.get(id);
  }

  list() {
    return this.database.list(this.path);
  }

}
