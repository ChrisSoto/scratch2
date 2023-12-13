import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SystemDataSource } from '../../../services/cdk-datasource/system.datasource';
import { PatternSystemService } from '../../../services/pattern-system.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PatternDataService } from '../../../services/pattern-data.service';
import { MatCardModule } from '@angular/material/card';
import { PatternService } from '../../../services/pattern.service';

@Component({
  selector: 'patterns-systems-list',
  standalone: true,
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
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
    PatternDataService,
  ]
})
export class PatternsSystemListComponent implements OnInit {

  systemService = inject(PatternSystemService);
  pagination = inject(PaginationService);
  sortToQuery = inject(SortToQueryConstraintsService);
  patternService = inject(PatternService);

  dataSource = new SystemDataSource(this.systemService, this.pagination);
  lastSort: Sort = { active: 'created', direction: 'desc' };
  limit: number = 10;
  displayedColumns: string[] = ['new-pattern', 'name', 'description', 'created', 'updated'];

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

  trackFn() {
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

  createPattern(patternId: string) {
    this.patternService.createFromId(patternId);
  }

}
