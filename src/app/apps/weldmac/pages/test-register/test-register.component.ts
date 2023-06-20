import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-test-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './test-register.component.html',
  styleUrls: ['./test-register.component.scss']
})
export class TestRegisterComponent {

  private fb = new FormBuilder();

  registerFormGroup = this.fb.group({
    machine: new FormGroup({
      brand: new FormControl(null),
      power: new FormControl(null),
      serial: new FormControl(null)
    }),
    operator: new FormGroup({
      name: new FormControl(null),
      date: new FormControl(null),
    }),
    job: new FormGroup({
      customer: new FormControl(null),
      number: new FormControl(null),
    }),
    part: new FormGroup({
      number: new FormControl(null),
      revision: new FormControl(null),
    }),
    operationNumber: new FormControl(null),
    notes: new FormControl(null),
    weldNumber: new FormControl(null),
    current: new FormControl(null),
    extensions: new FormGroup({
      top: new FormControl(null),
      bottom: new FormControl(null),
    }),
    nuggestSizeSpec: new FormControl(null),
    penetration: new FormControl(null)
  });

  ngOnInit() {
    // insert known values
  }
}
