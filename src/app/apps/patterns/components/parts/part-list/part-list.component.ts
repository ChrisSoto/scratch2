import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PatternSystemPartService } from '../../../services/pattern-system-part.service';
import { Sort } from '@angular/material/sort';
import { PartDataSource } from '../../../services/cdk-datasource/part.datasource';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PatternsPartEditComponent } from '../part-edit/patterns-part-edit.component';
import { DialogReturn, PPart } from '../../../model/models.interface';
import { switchMap } from 'rxjs';
import { PatternActiveSystemService } from '../../../services/pattern-active-system.service';
import { PatternDialogReturnService } from '../../../services/pattern-dialog-return.service';

@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CdkTableModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule,
    MatDividerModule,
  ],
  providers: [
    PatternSystemPartService,
    PaginationService,
    SortToQueryConstraintsService,
  ],
  templateUrl: './part-list.component.html',
  styleUrl: './part-list.component.scss'
})
export class PatternsPartListComponent {

  private dialog = inject(MatDialog);
  private partService = inject(PatternSystemPartService);
  private pagination = inject(PaginationService);
  private sortToQuery = inject(SortToQueryConstraintsService);
  private dialogReturn = inject(PatternDialogReturnService);

  dataSource = new PartDataSource(this.partService, this.pagination);
  lastSort: Sort = { active: 'created', direction: 'desc' };
  limit: number = 10;
  displayedColumns: string[] = ['name', 'description', 'created', 'updated'];

  ngOnInit(): void {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query);
  }

  newPart() {
    this.dialog.open(PatternsPartEditComponent, { data: null })
      .afterClosed()
      .pipe(
        switchMap((value: DialogReturn<PPart>): PromiseLike<DialogReturn<PPart>> => {
          if (!value) return this.dialogReturn.null<PPart>();
          const part = value.data as PPart;
          if (value.status === 'create') {
            return this.partService.create(part)
              .then(_ => {
                return this.dialogReturn.status<PPart>(value);
              })
          } else {
            return this.dialogReturn.null<PPart>();
          }
        })
      )
      .subscribe(value => {
        console.log(value);
      })
  }

  onPageChange(pageEvent: PageEvent) {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query, pageEvent);
  }

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
