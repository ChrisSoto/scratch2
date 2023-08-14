import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SystemDataSource } from '../../../services/system.datasource';
import { SystemService } from '../../../services/system.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PatternNotesCreatorService } from '../../../services/pattern-notes-creator.service';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'patterns-systems-list',
  standalone: true,
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
  imports: [
    CommonModule,
    CdkTableModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  providers: [
    PaginationService,
  ]
})
export class PatternsSystemListComponent implements OnInit {

  systemService = inject(SystemService);
  pagination = inject(PaginationService);
  sortToQuery = inject(SortToQueryConstraintsService);
  notesService = inject(PatternNotesCreatorService)

  dataSource = new SystemDataSource(this.systemService, this.pagination);
  lastSort: Sort = { active: 'created', direction: 'desc' };
  limit: number = 10;
  displayedColumns: string[] = ['open', 'name', 'description', 'created', 'updated'];

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

  createNotes(patternId: string) {
    this.notesService.create(patternId);
  }

}
