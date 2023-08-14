import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternsHomeComponent } from './patterns-home/patterns-home.component';
import { PatternsSystemListComponent } from './components/systems/system-list/system-list.component';
import { PatternsSystemEditComponent } from './components/systems/system-edit/patterns-system-edit.component';
import { PatternsSystemViewComponent } from './components/systems/system-view/patterns-system-view.component';
import { PatternsNoteEditComponent } from './components/notes/note-edit/patterns-note-edit.component';

export const PatternsRouting: Routes = [
  {
    path: 'patterns',
    component: PatternsHomeComponent,
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
      }
    ]
  }
];