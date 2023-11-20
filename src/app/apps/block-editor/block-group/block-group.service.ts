import { ElementRef, Injectable } from '@angular/core';
import { BlockEditorModule } from '../block-editor.module';

@Injectable({
  providedIn: 'root'
})
export class BlockGroupService {

  current = 0;

  blockGroups: ElementRef<HTMLTextAreaElement>[] = [];

  constructor() { }

  add(textArea: ElementRef<HTMLTextAreaElement>) {
    this.blockGroups.push(textArea);
  }
}
