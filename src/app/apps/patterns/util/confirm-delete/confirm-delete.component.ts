import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pattern-confirm-delete',
  standalone: true,
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  imports: [
    MatIconModule,
  ]
})
export class ConfirmDeleteComponent {
  @Input() text: string = 'Are you sure you want to delete this?';
  @Output() confirmChange = new EventEmitter<boolean>();
}
