import { Component, Input } from '@angular/core';
import { PPart } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'patterns-part-view-2',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './part-view-2.component.html',
  styleUrl: './part-view-2.component.scss'
})
export class PartView2Component {
  @Input() part!: PPart;
  @Input() showLabels = true;
}
