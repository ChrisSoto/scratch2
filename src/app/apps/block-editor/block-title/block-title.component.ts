import { Component, EventEmitter, Input, OnInit, Output, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlockTabService } from '../services/block-tab.service';

@Component({
  selector: 'be-block-title',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './block-title.component.html',
  styleUrls: ['./block-title.component.scss']
})
export class BlockTitleComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  index = 0;

  @Output()
  titleChange = new EventEmitter<string>();

  tabService = inject(BlockTabService);

  dirty = signal<boolean>(false);
  id = signal<string>('');

  ngOnInit(): void {
    this.id.set(this.tabService.createId(undefined, this.index));
    this.tabService.addInput(this.id());
  }
  
  change() {
    this.dirty.set(true);
  } 

  onFocusOutChange() {
    if (this.dirty()) {
      this.titleChange.emit(this.title);
    }
  }

}
