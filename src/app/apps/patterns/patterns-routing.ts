import { Routes } from '@angular/router';
import { PatternsHomeComponent } from './patterns-home/patterns-home.component';
import { PatternsSystemListComponent } from './components/systems/system-list/system-list.component';
import { PatternsSystemEditComponent } from './components/systems/system-edit/patterns-system-edit.component';
import { PatternsSystemViewComponent } from './components/systems/system-view/patterns-system-view.component';
import { PatternsPartListComponent } from './components/parts/part-list/part-list.component';
import { PatternsDataEditComponent } from './components/data/data-edit/patterns-data-edit.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { PatternsPartViewPageComponent } from './components/parts/part-view-page/patterns-part-view-page.component';

export const PatternsRouting: Routes = [
  {
    path: '',
    component: PatternsHomeComponent,
    providers: [
      { 
        provide: MAT_DIALOG_DEFAULT_OPTIONS, 
        useValue: { width: '350px' }
      },
    ],
    children: [
      {
        path: 'new',
        component: PatternsSystemEditComponent,
      },
      {
        path: 'view', // change to "systems"
        component: PatternsSystemListComponent,
      },
      {
        path: 'edit/:id',
        component: PatternsSystemViewComponent,
      },
      {
        path: 'patterns',
        component: PatternsDataEditComponent,
      },
      {
        path: 'patterns/:id',
        component: PatternsDataEditComponent,
      },
      {
        path: 'parts',
        component: PatternsPartListComponent,
      },
      {
        path: 'parts/:id',
        component: PatternsPartViewPageComponent,
      }
    ]
  }
];