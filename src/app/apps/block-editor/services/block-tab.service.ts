import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

@Injectable()
export class BlockTabService {

  curr = signal<HTMLElement | null>(null);
  prev = signal<HTMLElement | null>(null);
  next = signal<HTMLElement | null>(null);

  index = signal<number>(0);

  inputs = signal<string[]>([]);
  ready = signal<boolean>(false);

  timeout!: NodeJS.Timeout;

  document = inject(DOCUMENT);

  addInput(id: string) {
    if (!this.ready()) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.ready.set(true);
      this.setFocus();
      this.setTabIndex();
    }, 500);

    const inputs = this.inputs();
    inputs.push(id);
    this.inputs.set(inputs);
  }

  setTabIndex() {
    // const inputs = this.inputs();
    // inputs.map((id, index) => {
    //   const element = this.getElement(id);
    //   element?.setAttribute('tabindex', index + '');
    // })
  }

  setFocus() {
    // set the current as focus
    // const id = this.inputs()[this.index()]; 
    // const element = this.getElement(id);
    // this.curr.set(element);
    // this.curr()?.focus();
  }

  tab() {
    let index = this.index();
    this.index.set(index + 1);
    this.setFocus();
  }

  tabUp() {
    console.log('Up')
  }

  tabDown() {
    console.log('Down')
  }

  // setCurrent(id: string) {
  //   const prev = this.curr();
  //   let next = -1;
  //   this.prev.set(prev);
  //   const el = this.getElement(id);
  //   if (el) {
  //     this.curr.set(el);
  //   } else {
  //     this.curr.set(prev);
  //   }

  //   const inputs = this.inputs();
  //   next = inputs.findIndex(i => i === id);
  //   if (next !== -1) {
  //     const el = this.getElement(id);
  //     this.next.set(el);
  //   }
  //   const element = this.curr();
  //   element?.focus();
  // }

  createId(pIndex?: number, index?: number) {
    if (typeof pIndex === 'number' && pIndex > -1) {
      return 'data-' + pIndex + '-' + index;
    }
    return 'data-' + index;
  }

  getElement(id: string): HTMLElement | null {
    return this.document.getElementById(id);
  }

  reset() {
    this.inputs.set([]);
    this.ready.set(false);
    this.curr.set(null);
    this.next.set(null);
    this.prev.set(null);
  }
}
