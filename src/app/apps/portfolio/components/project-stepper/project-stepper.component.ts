import { Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PortfolioNavService } from '../../services/project-navigation.service';

@Component({
  selector: 'project-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-stepper.component.html',
  styleUrls: ['./project-stepper.component.scss']
})
export class ProjectStepper {
  @Input() steps!: any[];
  @Output() stepChange = new EventEmitter<number>();

  selectedIndex$ = inject(PortfolioNavService).selectedIndex$;
  nav = inject(PortfolioNavService);

  selectStepByIndex(index: number): void {
    this.stepChange.emit(index);
    this.selectedIndex$.next(index);
  }
}
