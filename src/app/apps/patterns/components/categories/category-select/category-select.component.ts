import { Component } from '@angular/core';
import { PCategoryType } from '../../../model/models.interface';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuantityComponent } from '../types/quantity/quantity.component';
import { PlaceComponent } from '../types/place/place.component';
import { ColorComponent } from '../types/color/color.component';
import { ConditionComponent } from '../types/condition/condition.component';
import { TimeComponent } from '../types/time/time.component';
import { ImageComponent } from '../types/image/image.component';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CommonFabButtonComponent } from 'src/app/shared/components/common-fab-button/common-fab-button.component';

@Component({
  selector: 'pattern-category-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonFabButtonComponent,
    QuantityComponent,
    PlaceComponent,
    ColorComponent,
    ConditionComponent,
    TimeComponent,
    ImageComponent
  ],
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent {
  categoryTypes = PCategoryType;
  categories: string[] = Object.values(PCategoryType);
  selectedCategory!: string;
}
