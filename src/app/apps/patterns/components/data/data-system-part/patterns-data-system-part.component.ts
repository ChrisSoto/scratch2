import { Component, Input } from '@angular/core';
import { PPart } from '../../../model/models.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'patterns-data-system-part',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './patterns-data-system-part.component.html',
  styleUrls: ['./patterns-data-system-part.component.scss']
})
export class PatternsDataSystemPartComponent {
  @Input() part!: PPart;
}
