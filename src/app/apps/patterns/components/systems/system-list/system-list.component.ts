import { Component, OnInit, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SystemDataSource } from '../../../services/cdk-datasource/system.datasource';
import { PatternSystemService } from '../../../services/pattern-system.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PatternDataService } from '../../../services/pattern-data.service';
import { MatCardModule } from '@angular/material/card';
import { PatternService } from '../../../services/pattern.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'patterns-systems-list',
  standalone: true,
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    CdkTableModule,
    MatCheckboxModule,
    FormsModule,
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

  showSubSystems = signal<boolean>(false);

  dataSource = new SystemDataSource(this.systemService, this.pagination);
  lastSort: Sort = { active: 'created', direction: 'desc' };
  limit: number = 10;
  displayedColumns: string[] = ['new-pattern', 'name', 'description', 'created', 'updated'];

  ngOnInit(): void {
    this.dataSource.loadPaginated(this.createQuery());
  }

  onPageChange(pageEvent: PageEvent) {
    this.dataSource.loadPaginated(this.createQuery(), pageEvent);
  }

  onSubSystemChange(showSubSystems: boolean) {
    this.showSubSystems.set(showSubSystems);
    this.dataSource.loadPaginated(this.createQuery());
  }

  trackFn() {}

  nextPage() {}

  previousPage() {}

  firstPage() {}

  lastPage() {}

  sortSystems(sort: Sort) {
    this.lastSort = sort;
    this.dataSource.loadPaginated(this.createQuery());
  }

  createPattern(patternId: string) {
    this.patternService.createFromId(patternId);
  }

  createQuery(): GeneralQuery[] {
    const query = this.sortToQuery.convertFromSort(this.lastSort);
    query.push({ name: 'limit', limit: this.limit });
    query.push({ name: 'where', field: 'isSubSystem', operator: '==', value: this.showSubSystems() });
    return query;
  }

}
