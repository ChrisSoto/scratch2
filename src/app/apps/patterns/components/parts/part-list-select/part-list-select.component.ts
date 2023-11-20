import { Output, Component, inject, signal, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SystemPartService } from '../../../services/system-part.service';
import { PPart } from '../../../model/models.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'pattern-part-list-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './part-list-select.component.html',
  styleUrl: './part-list-select.component.scss'
})
export class PartListSelectComponent {

  @Output() partIdChange = new EventEmitter<string>();

  partService = inject(SystemPartService);
  partList$!: Observable<PPart[]>;

  selectedPart = signal('');

  ngOnInit() {
    this.partList$ = this.partService.list$([{field: 'created', name: 'orderBy', 'direction': 'desc'}]);
  }

  selectPart(partId: string) {
    this.selectedPart.set(partId);
  }

}
