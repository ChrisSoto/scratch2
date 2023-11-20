import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'be-block-title',
  templateUrl: './block-title.component.html',
  styleUrls: ['./block-title.component.scss']
})
export class BlockTitleComponent implements OnInit {

  @Input()
  title: string = '';

  @Output()
  titleChange = new EventEmitter<string>();

  dirty = false;

  constructor() { }

  ngOnInit(): void {}
  
  change(tile: string) {
    this.dirty = true;
  } 

  onFocusOutChange() {
    if (this.dirty) {
      this.titleChange.emit(this.title);
    }
  }

}
