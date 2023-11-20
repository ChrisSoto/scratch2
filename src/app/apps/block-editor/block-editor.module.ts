import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockGroupEditAbstractComponent } from './block-group-edit-abstract/block-group-edit-abstract.component';
import { BlockGroupEditComponent } from './block-group-edit/block-group-edit.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaBlockComponent } from './blocks/textarea-block/textarea-block.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MarkdownModule } from 'ngx-markdown';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { BlockTypeMenuComponent } from './block-type-menu/block-type-menu.component';
import { AddBlockComponent } from './add-block/add-block.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlockGroupComponent } from './block-group/block-group.component';
import { BlockTitleComponent } from './block-title/block-title.component';
import { BlockGroupService } from './block-group/block-group.service';



@NgModule({
  declarations: [
    BlockGroupEditAbstractComponent,
    BlockGroupEditComponent,
    TextareaBlockComponent,
    BlockTypeMenuComponent,
    AddBlockComponent,
    BlockGroupComponent,
    BlockTitleComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    TextFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    OverlayModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [
    BlockGroupEditAbstractComponent,
    BlockGroupEditComponent,
    BlockTitleComponent,
    TextareaBlockComponent,
    BlockTypeMenuComponent,
    AddBlockComponent,
    BlockGroupComponent
  ]
})
export class BlockEditorModule { }
