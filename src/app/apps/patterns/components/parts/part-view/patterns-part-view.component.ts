import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PPart } from '../../../model/models.interface';
import { ActiveSystemService } from '../../../services/active-system.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'patterns-part-view',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './patterns-part-view.component.html',
  styleUrls: ['./patterns-part-view.component.scss']
})
export class PatternsPartViewComponent {
  @Input() part!: PPart;
  @Input() isLast!: boolean;
  @Input() index!: number;

  constructor(public active: ActiveSystemService) { }
}
