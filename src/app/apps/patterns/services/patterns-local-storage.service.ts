import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { LocalStorageService } from 'src/app/services/local-storage-ref.service';

@Injectable()
export class PatternsLocalStorageService {

  private systemSortKey = 'p-system-sort';

  constructor(private ls: LocalStorageService) {}

  setSystemSort(sort: Sort): void {
    this.ls.storage.setItem(this.systemSortKey, this.ls.pack(sort));
  }

  getSystemSort(): Sort {
    const sort = this.ls.storage.getItem(this.systemSortKey);
    return this.ls.unPack(sort);
  }


}
