import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-status.component.html',
  styleUrls: ['./action-status.component.scss']
})
export class ActionStatusComponent {
  data = inject(MAT_SNACK_BAR_DATA);
}
