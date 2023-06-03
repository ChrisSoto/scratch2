import { Injectable } from '@angular/core';

function getLocalStorage(): Storage {
  return localStorage;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // get storage(): Storage {
  //   return getLocalStorage();
  // }

  getLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
      return this.unPack<T>(data);
    } else {
      return null;
    }
  }

  setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, this.pack(data));
  }

  private pack(data: any): string {
    return JSON.stringify(data);
  }

  private unPack<T>(data: any): T {
    return JSON.parse(data);
  }
}
