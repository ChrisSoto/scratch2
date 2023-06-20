import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WeldmacSelectedComponent } from '../../components/weldmac-selected/weldmac-selected.component';
import { WeldmacMachineService, WeldmacResistanceWeldMachine } from '../../services/weldmac-machine.service';
import { WeldmacPart, WeldmacPartService } from '../../services/weldmac-part.service';
import { Observable, map, startWith } from 'rxjs';
import { WeldmacHeaderComponent } from '../../components/weldmac-header/weldmac-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WeldmacTestRegisterService } from '../../services/weldmac-test-register.service';

@Component({
  selector: 'app-create-register-by-part-number',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    WeldmacSelectedComponent,
    WeldmacHeaderComponent
  ],
  providers: [
    WeldmacMachineService,
    WeldmacPartService,
    WeldmacTestRegisterService,
  ],
  templateUrl: './create-register-by-part-number.component.html',
  styleUrls: ['./create-register-by-part-number.component.scss']
})
export class CreateRegisterByPartNumberComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private registerService = inject(WeldmacTestRegisterService);

  machines$ = inject(WeldmacMachineService).machines$;
  selectedMachine = signal<WeldmacResistanceWeldMachine | boolean>(false);
  machine = computed(() => {
    const machine = this.selectedMachine() as WeldmacResistanceWeldMachine;
    return machine;
  });

  parts$ = inject(WeldmacPartService).parts$;
  selectedPart = signal<WeldmacPart | boolean>(false);
  part = computed(() => {
    const part = this.selectedPart() as WeldmacPart;
    return part;
  });

  partsControl = new FormControl({ value: '', disabled: true });
  filteredParts$!: Observable<WeldmacPart[]>;

  ngOnInit() {
    this.filteredParts$ = this.partsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          // a "temporary" hack
          if (value && typeof value !== 'string') {
            this.selectedPart.set(value);
            this.partsControl.setValue(null);
          }
          return this._filter(value || '')
        }),
      );
  }

  private _filter(value: string): WeldmacPart[] {
    if (typeof value !== 'string') return [];
    const filterValue = value.toLowerCase();
    const parts = this.parts$.value;
    return parts.filter(part => part.number.toLowerCase().includes(filterValue));
  }

  selectMachineChange(event: MatSelectChange) {
    const machine = event.value as WeldmacResistanceWeldMachine;
    this.partsControl.enable();
    this.selectedMachine.set(machine);
  }

  unSelectMachine() {
    this.selectedMachine.set(false);
    this.selectedPart.set(false);
    this.partsControl.disable();
  }

  selectPartChange(event: MatSelectChange) {
    const part = event.value as WeldmacPart;
    this.selectedPart.set(part);
  }

  newRegister() {
    const id = this.registerService.newRegisterId();
    this.router.navigate(['register/' + id], { relativeTo: this.route });
  }
}
