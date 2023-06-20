import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'common-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './common-select.component.html',
  styleUrls: ['./common-select.component.scss']
})
export class CommonSelectComponent<T> {
  @Input() options: T[] | null = [];
  @Input() label: string = 'Select';
  @Input() showFab: boolean = true;
  @Output() addOptionChange = new EventEmitter<T | null>();

  selected = signal<T | null>(null);

  selectChange(selection: MatSelectChange) {
    let selected = selection.value as T;
    if (this.showFab) {
      this.selected.set(selected);
    } else {
      this.selected.set(selected);
      this.addOptionChange.emit(selected);
    }
  }

}
