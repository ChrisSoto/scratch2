import { Injectable, inject } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Timestamp } from '@angular/fire/firestore';
import { WeldmacPart } from './weldmac-part.service';
import { WeldmacResistanceWeldMachine } from './weldmac-machine.service';

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
  name: '',
  date: Timestamp | null;
}

export interface TestRegister {
  machine: WeldmacResistanceWeldMachine;
  operator: NameDate;
  customer: string;
  job: { number: string, revision: string; };
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

  newRegisterId() {
    return this.database.createId();
  }
}
