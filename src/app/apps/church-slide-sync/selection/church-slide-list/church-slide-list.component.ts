import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { ChurchSlidesService } from '../../services/church-slides.service';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { NewSlidesFormComponent } from '../../dialogs/new-slides-form/new-slides-form.component';

@Component({
  selector: 'app-church-slide-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CdkTableModule,
    MatDialogModule,
    CommonFabButtonComponent,
    NewSlidesFormComponent,
  ],
  providers: [
    ChurchSlidesService
  ],
  templateUrl: './church-slide-list.component.html',
  styleUrls: ['./church-slide-list.component.scss']
})
export class ChurchSlideListComponent {

  private dialog = inject(MatDialog);

  churchSlides = inject(ChurchSlidesService);
  displayedColumns: string[] = ['title', 'date'];

  newSlides() {
    this.dialog.open(NewSlidesFormComponent)
      .afterClosed()
      .pipe()
      .subscribe();
  }
}
