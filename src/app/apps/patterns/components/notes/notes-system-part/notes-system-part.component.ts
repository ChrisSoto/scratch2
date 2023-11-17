import { Component, Input } from '@angular/core';
import { PPart } from '../../../model/models.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'notes-system-part',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './notes-system-part.component.html',
  styleUrls: ['./notes-system-part.component.scss']
})
export class NotesSystemPartComponent {
  @Input() part!: PPart;
}
