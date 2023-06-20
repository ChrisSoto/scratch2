import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'weldmac-selected',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './weldmac-selected.component.html',
  styleUrls: ['./weldmac-selected.component.scss']
})
export class WeldmacSelectedComponent {

  @Input()
  label: string = 'Selection';

  @Output()
  removeSelection = new EventEmitter<void>();
}
