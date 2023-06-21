import { Injectable, inject } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { DocumentData, DocumentReference, DocumentSnapshot, Timestamp } from '@angular/fire/firestore';
import { WeldmacPart } from './weldmac-part.service';
import { WeldmacResistanceWeldMachine } from './weldmac-machine.service';
import { Observable } from 'rxjs';
import { GeneralQuery, SortToQueryConstraintsService } from 'src/app/shared/services/sort-to-query-constraints.service';
import { PaginatedCollection } from 'src/app/shared/interface/pagination.model';
import { Meta } from 'src/app/shared/interface/meta.model';

interface ExtensionProperties {
  length: string;
  diameter: string;
}

// interface LoHigh {
//   low: number;
//   high: number;
// }

enum ForceMode {
  'CONST_LOW' = 0,
  'CONST_HIGH' = 1,
  'FORGE_FORCE' = 2,
}

// enum ForgeDelay {
//   'HEAT' = 0,
//   'DOWNSLOPE' = 1
// }

// enum WeldCheck {
//   'NONE' = 0,
//   'FIRST' = 1,
//   'EVERY' = 2
// }

enum SeamMode {
  'ROLL_SPOT' = 0,
  'CONTINOUS' = 1,
}

enum MotorDirection {
  'FORWARD' = 0,
  'REVERSE' = 1,
}

interface NameDate {
  firstName: string;
  lastName: string;
  date: Timestamp | null;
}

interface WeldmacJob {
  number: string;
  customer: string;
}

export interface TestRegister extends Meta {
  machine: WeldmacResistanceWeldMachine;
  operator: NameDate;
  job: WeldmacJob;
  part: WeldmacPart;
  operation: { key?: number | null, number: number };
  notes?: string | null;
  weldNumber: string;
  current?: number | null;
  extensions?: {
    top: ExtensionProperties | null;
    bottom: ExtensionProperties | null;
  };
  nuggestSize: {
    spec: number;
    blueprint?: number;
  };
  penetration: {
    min: number;
    max?: number | null;
  };
  elapseTimeCleanToWeld?: number | null;
  surfacePrep?: string | null;



  // machine properties
  // ACTIVE
  // forceDown: ForceMode;
  // pressure: {
  //   down: number;
  //   up: number;
  //   ecg: number;
  // };
  // // delayBeforePreComp: number;
  // // preCompression: number;
  // squeezeTime: number;




  // beginForgeDelayWRespTo: ForgeDelay;
  // forgeDelay: number;
  // partThicknessChecking: WeldCheck;
  // initialPartThicknessLimit: LoHigh;
  // weldForceCheck: WeldCheck;
  // initialWeldForceLimit: LoHigh;
  // preheat: {
  //   upslope: number;
  //   current: number;
  //   time: number;
  //   afterLast: number;
  //   impulses: number;
  // };

  // ACTIVE
  // heat1: {
  //   current: number;
  //   time: number;
  //   afterLast: number;
  //   impulses: number;
  //   // alarm: {
  //   //   checking: boolean;
  //   //   max: number;
  //   //   deviations: number;
  //   // };
  // };


  // heat2: {
  //   current: number;
  //   time: number;
  // };
  // expansionLowLimit: number;
  // postheat: {
  //   downslope: number;
  //   current: number;
  //   time: number;
  // };
  // dataCollectionTime: number;
  // finalHoldTime: number;
  // .
  // .
  // .
  //



  // ACTIVE
  // seamMode: SeamMode;
  // motorDirection: MotorDirection;
  // spotSpacing: number;
  // motorVelocity: number;
  // motorAcceleration: number;
  // limitOnSeamDistance: number;
  // positionOfFirstWeld: number;
  // continuousSeamCurrent: {
  //   first: number;
  //   second: number;
  //   third: number;
  // };
  // heat1heat2Integral: number;
}

@Injectable()
export class WeldmacTestRegisterService {
  private database = inject(DatabaseService);
  private sortToQuery = inject(SortToQueryConstraintsService);

  path = 'weldmac_register';

  newRegisterId() {
    return this.database.createId();
  }

  set(id: string, register: TestRegister) {
    return this.database.set(this.path + '/' + id, register);
  }

  create(register: Partial<TestRegister>): Promise<DocumentReference<TestRegister>> {
    return this.database.add(this.path, register);
  }

  read(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return this.database.get(this.path + '/' + id);
  }

  list$(sort?: GeneralQuery[]): Observable<TestRegister[]> {
    if (!sort) sort = [{ name: 'orderBy', field: 'created', direction: 'desc' }];
    return this.database.list(this.path, ...this.sortToQuery.convert(sort));
  }

  listPaginated$(sort?: GeneralQuery[]): Observable<PaginatedCollection<TestRegister>> {
    if (!sort) sort = [{ name: 'orderBy', field: 'created', direction: 'desc' }];
    return this.database.listPaginated(this.path, ...this.sortToQuery.convert(sort));
  }

  update(register: Partial<TestRegister>): Promise<void> {
    return this.database.update(this.path + '/' + register.id, register);
  }

  remove(id: string): Promise<void> {
    return this.database.delete(this.path + '/' + id);
  }
}
