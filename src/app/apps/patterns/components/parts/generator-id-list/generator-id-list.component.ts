import { Component, OnInit, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { GeneratorIdName, PSystem } from '../../../model/models.interface';
import { SystemService } from '../../../services/system.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'generator-id-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './generator-id-list.component.html',
  styleUrls: ['./generator-id-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GeneratorIdListComponent
    }
  ]
})
export class GeneratorIdListComponent implements ControlValueAccessor, OnInit {

  systemService = inject(SystemService);

  generatorIds: string[] = [];
  systemsList$ = new BehaviorSubject<PSystem[]>([]);
  namedIds$ = new BehaviorSubject<GeneratorIdName[]>([]);
  touched = false;

  private systemList: PSystem[] = [];

  ngOnInit(): void {
    this.loadSystemsList();
  }

  addId(id: string) {
    this.generatorIds.push(id);
    this.onChange(this.generatorIds);
    this.filterSelectedGeneratorIds();
    this.createNamedList();
    this.markAsTouched();
  }

  removeId(id: string) {
    this.generatorIds = this.generatorIds.filter(val => val !== id);
    this.onChange(this.generatorIds);
    this.filterSelectedGeneratorIds();
    this.createNamedList();
    this.markAsTouched();
  }

  loadSystemsList() {
    this.systemService.list$()
      .subscribe(systems => {
        this.systemList = systems;
        this.createNamedList();
        this.filterSelectedGeneratorIds();
      });
  }

  filterSelectedGeneratorIds() {
    const list = this.systemList.filter(system => !this.isInList(system));
    this.systemsList$.next(list);
  }

  isInList(system: PSystem) {
    if (system.id) {
      return this.generatorIds.includes(system.id);
    } else {
      return false;
    }
  }

  createNamedList() {
    const systems = this.systemList;
    const namedList = this.generatorIds.map(id => {
      const sys = systems.find(system => system.id === id);
      if (sys) {
        return { name: sys.name, id: sys.id } as GeneratorIdName;
      }
      return { name: '', id: '' };

      // hack because I couldn't figure out a way to filter null values
    }).filter(d => d.name !== '');

    this.namedIds$.next(namedList);
  }

  writeValue(generatorIds: string[]): void {
    this.generatorIds = generatorIds;
  }

  onChange = (generatedIds: string[]) => { };

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onTouched = () => { };

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

}
