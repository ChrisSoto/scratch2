import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-slide',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './remove-slide.component.html',
  styleUrls: ['./remove-slide.component.scss']
})
export class RemoveSlideComponent {
  dialogRef = inject(MatDialogRef<RemoveSlideComponent>);
}
