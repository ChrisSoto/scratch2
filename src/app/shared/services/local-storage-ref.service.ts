import { Injectable } from '@angular/core';

function getLocalStorage(): Storage {
  return localStorage;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get storage(): Storage {
    return getLocalStorage();
  }

  pack(data: any) {
    return JSON.stringify(data);
  }

  unPack(data: any) {
    return JSON.parse(data);
  }
}
