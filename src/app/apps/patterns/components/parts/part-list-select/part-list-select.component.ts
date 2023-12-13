import { Output, Component, inject, signal, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PatternPartService } from '../../../services/pattern-part.service';
import { PPart } from '../../../model/models.interface';
import { Observable, tap } from 'rxjs';
import { PatternSystemService } from '../../../services/pattern-system.service';

@Component({
  selector: 'pattern-part-list-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
  ],
  providers: [
    PatternSystemService,
    PatternPartService
  ],
  templateUrl: './part-list-select.component.html',
  styleUrl: './part-list-select.component.scss'
})
export class PartListSelectComponent {

  @Input() part!: PPart | null;
  @Output() partChange = new EventEmitter<PPart>();

  partService = inject(PatternPartService);
  partList$!: Observable<PPart[]>;

  selectedPart = signal<PPart | null>(null);

  ngOnInit() {
    this.partList$ = this.partService.list$([{field: 'created', name: 'orderBy', 'direction': 'desc'}])
      .pipe(
        // was trying to get this to reapply the previous selected value, not working
        tap(_ => {
          if (this.part) {
            this.selectedPart.set(this.part);
          }
        })
      );
  }

}
