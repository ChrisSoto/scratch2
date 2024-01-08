import { Component, inject } from '@angular/core';
import { PatternsPartViewComponent } from '../part-view/patterns-part-view.component';
import { PPartCompare } from '../../../model/models.interface';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PartView2Component } from '../part-view-2/part-view-2.component';

@Component({
  selector: 'patterns-part-compare',
  standalone: true,
  imports: [
    PartView2Component,
    MatDialogModule,
  ],
  templateUrl: './part-compare.component.html',
  styleUrl: './part-compare.component.scss'
})
export class PatternsPartCompareComponent {

  public data: PPartCompare = inject(MAT_DIALOG_DATA);

}
