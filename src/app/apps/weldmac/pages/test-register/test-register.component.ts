import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TestRegister, WeldmacTestRegisterService } from '../../services/weldmac-test-register.service';
import { WeldmacResistanceWeldMachine } from '../../services/weldmac-machine.service';
import { WeldmacPart } from '../../services/weldmac-part.service';
import { WeldmacActiveTestRegisterService } from '../../services/weldmac-active-test-register.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { mergeMap, of, tap } from 'rxjs';

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

  private registerService = inject(WeldmacTestRegisterService);
  private fb = new FormBuilder();
  private route = inject(ActivatedRoute);

  machine$ = inject(WeldmacActiveTestRegisterService).machine$;
  part$ = inject(WeldmacActiveTestRegisterService).part$;

  registerFormGroup = this.fb.nonNullable.group({
    machine: new FormGroup({
      brand: new FormControl(''),
      power: new FormControl(0),
      serial: new FormControl('')
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
      number: new FormControl(''),
      revision: new FormControl(''),
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
    this.route.paramMap
      .pipe(
        mergeMap((params) => {
          const id = params.get('id');
          if (id) return this.registerService.read(id);
          return of(null)
        })
      )
      .subscribe(data => {
        if (data?.exists()) {
          const register = data.data() as Partial<TestRegister>;
          this.patchValues(register);
        }
      })

    // insert known values
    // const machine = this.machine$.value as WeldmacResistanceWeldMachine;
    // const part = this.part$.value as WeldmacPart;

    // this.registerFormGroup.patchValue(
    //   {
    //     machine: {
    //       brand: machine.brand,
    //       power: machine.power,
    //       serial: machine.serial
    //     }
    //   })
  }

  patchValues(register: Partial<TestRegister>) {
    this.registerFormGroup.patchValue(
      {
        machine: register.machine,
        part: register.part
      }
    )
  }
}
