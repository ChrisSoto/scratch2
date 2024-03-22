import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-service',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './remove-service.component.html',
  styleUrl: './remove-service.component.scss'
})
export class RemoveServiceComponent {
  dialogRef = inject(MatDialogRef<RemoveServiceComponent>);
}
