import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { SystemPartService } from '../../../services/system-part.service';
import { Sort } from '@angular/material/sort';
import { PartDataSource } from '../../../services/part.datasource';

@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CdkTableModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './part-list.component.html',
  styleUrl: './part-list.component.scss'
})
export class PatternsPartListComponent {
  partService = inject(SystemPartService);
  pagination = inject(PaginationService);
  sortToQuery = inject(SortToQueryConstraintsService);

  dataSource = new PartDataSource(this.partService, this.pagination);
  lastSort: Sort = { active: 'created', direction: 'desc' };
  limit: number = 10;
  displayedColumns: string[] = ['name', 'description', 'created', 'updated'];

  ngOnInit(): void {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    this.dataSource.loadPaginated(query);
  }

  onPageChange(pageEvent: PageEvent) {
    console.log('change');
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
