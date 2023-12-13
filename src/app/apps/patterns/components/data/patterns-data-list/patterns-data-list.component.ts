import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatternService } from '../../../services/pattern.service';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PatternDialogReturnService } from '../../../services/pattern-dialog-return.service';
import { PatternDataSource } from '../../../services/cdk-datasource/pattern.datasource';
import { Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patterns-data-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CdkTableModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  providers: [
    PaginationService,
  ],
  templateUrl: './patterns-data-list.component.html',
  styleUrl: './patterns-data-list.component.scss'
})
export class PatternsDataListComponent {
  private dialog = inject(MatDialog);
  private patternService = inject(PatternService);
  private pagination = inject(PaginationService);
  private sortToQuery = inject(SortToQueryConstraintsService);
  private dialogReturn = inject(PatternDialogReturnService);

  dataSource = new PatternDataSource(this.patternService, this.pagination);
  lastSort: Sort = { active: 'created', direction: 'desc' };
  limit: number = 10;
  displayedColumns: string[] = ['name', 'description', 'created', 'updated'];

  ngOnInit(): void {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query);
  }

  newPattern() {
  //   this.dialog.open(PatternsPartEditComponent, { data: null })
  //     .afterClosed()
  //     .pipe(
  //       switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => {
  //         if (!value) return this.dialogReturn.null<PPart>();
  //         const part = value.data as PPart;
  //         if (value.status === 'create') {
  //           return this.partService.create(part)
  //             .then(_ => {
  //               return this.dialogReturn.status<PPart>(value);
  //             })
  //         } else {
  //           return this.dialogReturn.null<PPart>();
  //         }
  //       })
  //     )
  //     .subscribe(value => {
  //       console.log(value);
  //     })
  }

  onPageChange(pageEvent: PageEvent) {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query, pageEvent);
  }

  trackFn() {}

  nextPage() {

  }

  previousPage() {

  }

  firstPage() {

  }

  lastPage() {

  }

  sortSystems(sort: Sort) {
    this.lastSort = sort;
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query);
  }
}
