import { Injectable } from '@angular/core';

class God {

  constructor() { }

  static acceptsOffering() {
    console.log('God consumes offering. It is a sweet aroma.')
  }

  static giveHerd() {
    return this.createHerd(this.randomBetween(10, 100));
  }

  static giveFlock() {
    return this.createFlock(this.randomBetween(10, 100));
  }

  static createFlock(quantity: number): Beast[] {
    let flock = [];
    const smallLivestock = Object.values(SmallLivestock);
    for (let i = 1; i <= quantity; i++) {
      let beast = new Beast(
        smallLivestock[this.randomBetween(0, smallLivestock.length - 1)],
        Math.random() > 0.5 ? 'male' : 'female',
        Math.random() > 0.75
      );
      flock.push(beast);
    }
    return flock;
  }

  static createHerd(quantity: number): Beast[] {
    let herd = [];
    for (let i = 1; i <= quantity; i++) {
      let beast = new Beast(
        Cattle.bovine,
        Math.random() > 0.5 ? 'male' : 'female',
        Math.random() > 0.75
      );
      herd.push(beast);
    }
    return herd;
  }

  static randomBetween(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

class Tabernacle {
  worshiper: Worshiper;
  priest: Priest;
  altar: Altar = new Altar();
  constructor(worshiper: Worshiper, priest: Priest) {
    this.worshiper = worshiper;
    this.priest = priest;
    console.log(this.worshiper);
    console.log('willfully draws near...');
  }
}

class Altar {
  onTop: string[] = [];
  activeFire = false;
  sprinkledBlood = true;
  constructor() { }
}

class Priest {
  constructor() { }

  putOnAltar(tabernacle: Tabernacle, item: string) {
    if (item === 'fire') {
      tabernacle.altar.activeFire = true;
    }
    console.log('priest puts ' + item + ' on the altar...');
    tabernacle.altar.onTop.push(item);
  }

  sprinkleBloodOnSidesOfAlter(beast: Beast, tabernacle: Tabernacle) {
    console.log('the priest sprinkles blood on the sides of the altar...')
    beast.blood = 'Sprinkled on altar.';
    tabernacle.altar.sprinkledBlood = true;
  }
}

class Worshiper {
  private _herd = God.giveHerd();
  private _flock = God.giveFlock();
  herd: { [type: string]: Beast[] } = {};
  flock: { [type: string]: Beast[] } = {};
  bestHerdType: Offerings;
  constructor() {
    this.sortHerds();
    this.sortFlocks();
    this.findBest();
  }

  layHands(beast: Beast) {
    console.log('the worshiper lays hands on his offering...')
    beast.liability = this;
  }

  kills(beast: Beast, method?: string): Beast {
    console.log('worshiper kills the offering' + (method ? ' by ' + method : '') + '...');
    beast.dead = true;
    return beast;
  }

  giveFromHerd(sex: Sex, blemish: boolean, beast?: Cattle) {
    console.log('the worshiper gives one from the herd...')
    if (!beast) {
      return this.giveBest(sex, blemish);
    } else {
      return this.giveBestHerd(sex, blemish, beast);
    }
  }

  giveFromFlock(sex: Sex, blemish: boolean, beast?: SmallLivestock) {
    console.log('the worshiper gives one from the flock...')
    if (!beast) {
      return this.giveBest(sex, blemish);
    } else {
      return this.giveBestFlock(sex, blemish, beast);
    }
  }

  skin(beast: Beast) {
    console.log('worshiper skins the offering...')
    beast.skinned = true;
  }

  divide(beast: Beast) {
    console.log('worshiper divides the offering...')
    beast.divided = true;
  }

  cleanLegsAndOrgans(beast: Beast) {
    console.log('worshiper cleans legs and organs');
    beast.organsCleaned = true;
    beast.legsCleaned = true;
  }

  private giveBestHerd(sex: Sex, blemish: boolean, beast?: Offerings) {
    let worthy: Beast[] = [];
    if (this.herd[beast]) {
      worthy = this.herd[beast].filter(beast => beast.sex === sex && blemish === false);
    }
    if (worthy.length) {
      return worthy[0];
    } else {
      return null;
    }
  }

  private giveBestFlock(sex: Sex, blemish: boolean, beast?: Offerings) {
    let worthy: Beast[] = [];
    if (this.flock[beast]) {
      worthy = this.flock[beast].filter(beast => beast.sex === sex && blemish === false);
    }
    if (worthy.length) {
      return worthy[0];
    } else {
      return null;
    }
  }

  private giveBest(sex: Sex, blemish: boolean, beast?: Offerings) {
    let worthy: Beast[] = [];
    worthy = this.herd[this.bestHerdType].filter(beast => beast.sex === sex && blemish === false);
    if (worthy.length) {
      return worthy[0];
    } else {
      return null;
    }
  }

  private findBest() {
    if (this.herd[Cattle.bovine].length) {
      return Cattle.bovine;
    } else if (this.flock[SmallLivestock.goat].length) {
      return SmallLivestock.goat;
    } else if (this.flock[SmallLivestock.sheep].length) {
      return SmallLivestock.sheep;
    } else if (this.herd[Flyers.pigeon].length) {
      return Flyers.pigeon;
    } else {
      return '';
    }
  }

  private sortHerds() {
    for (let i = 0; i < this._herd.length; i++) {
      const key = this._herd[i].type.toString();
      if (this.herd[key]) {
        this.herd[key].push(this._herd[i]);
      } else {
        this.herd[key] = [];
        this.herd[key].push(this._herd[i]);
      }
    }
  }

  private sortFlocks() {
    for (let i = 0; i < this._flock.length; i++) {
      const key = this._flock[i].type.toString();
      if (this.flock[key]) {
        this.flock[key].push(this._flock[i]);
      } else {
        this.flock[key] = [];
        this.flock[key].push(this._flock[i]);
      }
    }
  }
}

class Offering {
  worshiper: Worshiper;
  from: OfferingFrom;
  constructor(worshiper: Worshiper, from: OfferingFrom) {
    this.worshiper = worshiper;
    this.from = from;
  }
}

class Ascension extends Offering {
  constructor(worshiper: Worshiper, from: OfferingFrom) {
    super(worshiper, from);
  }

  fromTheHerd(sex: Sex, blemish: boolean, beast?: Cattle) {
    return this.worshiper.giveFromHerd(sex, blemish, beast);
  }

  fromTheFlock(sex: Sex, blemish: boolean, beast?: SmallLivestock) {
    return this.worshiper.giveFromFlock(sex, blemish, beast);
  }
}

enum OfferingFrom {
  herd = 'Herd',
  flock = 'Flock',
  flyers = 'Flyers'
}

type Sex = 'male' | 'female';

// from the herd
enum Cattle {
  bovine = 'Bovine',
}

// from the flock
enum SmallLivestock {
  goat = 'Goat',
  sheep = 'Sheep',
}

// don't know yet
enum Flyers {
  pigeon = 'Pigeon',
  turtledove = 'Turtledove',
}

enum Grain {
  fineGrain = 'Fine_Grain',
  ovenBread = 'Oven_Bread',
  panBread = 'Pan_Bread',
  freshGrain = 'Fresh_Grain'
}

type Offerings = Cattle | SmallLivestock | Flyers;
type Fluid = 'Blood' | 'Water' | 'Oil';

class Beast {
  type: Offerings;
  sex: Sex;
  blemish: boolean;
  liability: Worshiper = null;
  dead = false;
  blood = 'In Body';
  skinned = false;
  divided = false;
  organsCleaned = false;
  legsCleaned = false;
  constructor(type: Offerings, sex: Sex, blemish: boolean) {
    this.type = type;
    this.sex = sex;
    this.blemish = blemish;
  }
}

@Injectable()
export class OfferingService {

  constructor() {
    let offerings = [];
    const worshiper = new Worshiper();
    offerings.push(
      new Ascension(worshiper, OfferingFrom.flock),
      new Ascension(worshiper, OfferingFrom.herd),
    )
    for (let i = 0; i < offerings.length; i++) {
      this.make(offerings[i]);
    }
  }

  make(offering: Offering) {
    // priest instructions
    console.log('//-----------------------------------------//')
    console.log('An offering made...')
    if (offering instanceof Ascension) {
      if (offering.from === OfferingFrom.herd) {
        console.log('of ascension from the herd...')
        const beast = offering.fromTheHerd('male', false, Cattle.bovine);
        // draw near
        const tabernacle = new Tabernacle(offering.worshiper, new Priest());
        tabernacle.worshiper.layHands(beast);
        const deadBeast = tabernacle.worshiper.kills(beast);
        tabernacle.priest.sprinkleBloodOnSidesOfAlter(deadBeast, tabernacle);
        tabernacle.worshiper.skin(beast);
        tabernacle.worshiper.divide(beast);
        tabernacle.priest.putOnAltar(tabernacle, 'WOOD');
        tabernacle.priest.putOnAltar(tabernacle, 'FIRE');
        tabernacle.priest.putOnAltar(tabernacle, 'HEAD_AND_FAT');
        tabernacle.worshiper.cleanLegsAndOrgans(beast);
        tabernacle.priest.putOnAltar(tabernacle, 'ORGANS_AND_LEGS');
        God.acceptsOffering();
      } else if (offering.from === OfferingFrom.flock) {
        console.log('of ascension from the flock...');
        const beast = offering.fromTheFlock('male', false, SmallLivestock.goat);
        // draw near
        const tabernacle = new Tabernacle(offering.worshiper, new Priest());
        const deadBeast = tabernacle.worshiper.kills(beast, 'CUT_IN_GROIN NORTH_OF_ALTAR');
        tabernacle.priest.sprinkleBloodOnSidesOfAlter(deadBeast, tabernacle);
        tabernacle.worshiper.skin(beast);
        tabernacle.worshiper.divide(beast);
        tabernacle.priest.putOnAltar(tabernacle, 'WOOD');
        tabernacle.priest.putOnAltar(tabernacle, 'FIRE');
        tabernacle.priest.putOnAltar(tabernacle, 'HEAD_AND_FAT');
        tabernacle.worshiper.cleanLegsAndOrgans(beast);
        tabernacle.priest.putOnAltar(tabernacle, 'ORGANS_AND_LEGS');
        God.acceptsOffering();
      } else if (offering.from === OfferingFrom.flyers) {
        console.log('of ascension from the flyers...');
        const beast = offering.fromTheFlock('male', false, SmallLivestock.goat);
        // draw near
        const tabernacle = new Tabernacle(offering.worshiper, new Priest());
        const deadBeast = tabernacle.worshiper.kills(beast, 'CUT_IN_GROIN NORTH_OF_ALTAR');
        tabernacle.priest.sprinkleBloodOnSidesOfAlter(deadBeast, tabernacle);
        tabernacle.worshiper.skin(beast);
        tabernacle.worshiper.divide(beast);
        tabernacle.priest.putOnAltar(tabernacle, 'WOOD');
        tabernacle.priest.putOnAltar(tabernacle, 'FIRE');
        tabernacle.priest.putOnAltar(tabernacle, 'HEAD_AND_FAT');
        tabernacle.worshiper.cleanLegsAndOrgans(beast);
        tabernacle.priest.putOnAltar(tabernacle, 'ORGANS_AND_LEGS');
        God.acceptsOffering();
      }
    }
  }
}
