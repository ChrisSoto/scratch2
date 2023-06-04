import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'common-fab-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './common-fab-button.component.html',
  styleUrls: ['./common-fab-button.component.scss']
})
export class CommonFabButtonComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() orientation: 'vertical' | 'horizontal' = 'horizontal';
  @Input() icon: string = 'add';
  @Input() color: string = 'primary';

  @Output() buttonChange = new EventEmitter();
}
