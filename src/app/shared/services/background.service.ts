import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  private documentRef: Document = inject(DOCUMENT);


  setBackgroundClass(cls?: string) {
    console.log(cls);
    this.documentRef.body.classList.add(cls || 'bg-white');
  }

  removeBackgroundClass(cls: string) {
    this.documentRef.body.classList.remove(cls);
  }
}
