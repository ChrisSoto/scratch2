import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';
import { NewSlidesFormComponent } from '../../dialogs/new-slides-form/new-slides-form.component';
import { mergeMap } from 'rxjs';
import { ActionStatusService } from 'src/app/shared/services/action-status.service';
import { ChurchSlideshowDataSource } from '../../services/church-slideshow.datasource';
import { ChurchSlideshowService } from '../../services/church-slideshow.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule,
  ],
  providers: [
    ChurchSlideshowService,
    PaginationService
  ],
  templateUrl: './church-slide-list.component.html',
  styleUrls: ['./church-slide-list.component.scss']
})
export class ChurchSlideListComponent {

  private dialog = inject(MatDialog);
  private actionStatus = inject(ActionStatusService);
  private churchSlidesService = inject(ChurchSlideshowService);
  private sortToQuery = inject(SortToQueryConstraintsService);

  dataSource = new ChurchSlideshowDataSource();
  lastSort: Sort = { active: 'created', direction: 'desc' };
  limit: number = 10;
  displayedColumns: string[] = ['title', 'date'];

  ngOnInit(): void {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query);
  }

  onPageChange(pageEvent: PageEvent) {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query, pageEvent);
  }

  newSlides() {
    this.dialog.open(NewSlidesFormComponent)
      .afterClosed()
      .pipe(
        mergeMap((slides) => {
          return this.churchSlidesService.create(slides);
        })
      )
      .subscribe((ref) => {
        if (ref) {
          this.actionStatus.success(`Service Created!`);
        } else {
          this.actionStatus.failure(`Service Not Created!`);
        }
      });
  }
}
