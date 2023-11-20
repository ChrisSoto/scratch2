import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternsHomeComponent } from './patterns-home/patterns-home.component';
import { PatternsSystemListComponent } from './components/systems/system-list/system-list.component';
import { PatternsSystemEditComponent } from './components/systems/system-edit/patterns-system-edit.component';
import { PatternsSystemViewComponent } from './components/systems/system-view/patterns-system-view.component';
import { PatternsNoteEditComponent } from './components/notes/note-edit/patterns-note-edit.component';
import { PatternsPartListComponent } from './components/parts/part-list/part-list.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

export const PatternsRouting: Routes = [
  {
    path: '',
    component: PatternsHomeComponent,
    providers: [
      { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '350px' } }
    ],
    children: [
      {
        path: 'new',
        component: PatternsSystemEditComponent,
      },
      {
        path: 'view',
        component: PatternsSystemListComponent,
      },
      {
        path: 'edit/:id',
        component: PatternsSystemViewComponent,
      },
      {
        path: 'notes/:id',
        component: PatternsNoteEditComponent,
      },
      {
        path: 'parts',
        component: PatternsPartListComponent,
      }
    ]
  }
];