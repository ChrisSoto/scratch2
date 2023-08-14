import { Component, Input } from '@angular/core';
import { PPart } from '../../../model/models.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'notes-system-part',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './notes-system-part.component.html',
  styleUrls: ['./notes-system-part.component.scss']
})
export class NotesSystemPartComponent {
  @Input() part!: PPart;
}
