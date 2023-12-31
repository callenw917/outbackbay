const SPELL_SCHOOLS = [
  'Abjuration',
  'Necromancy',
  'Illusion',
  'Conjuration',
  'Evocation',
  'Divination',
  'Enchantment',
  'Transmutation',
];

export class Spell {
  id: string;
  name: string;
  description: string;
  level: number;
  classes: string[];
  school?: string;
  isRitual?: boolean;
  requiresConc?: boolean;
  source?: string;
  target?: target;
  castTime?: SpellTime;
  range?: SpellRange;
  components?: string;
  duration?: SpellTime;
  damageType?: string;

  constructor(
    id: string,
    name: string,
    description: string,
    level: number,
    classes: string[],
    school?: string,
    target?: target,
    castTime?: SpellTime,
    isRitual?: boolean,
    isConcentration?: boolean,
    source?: string,
    range?: SpellRange,
    components?: string,
    duration?: SpellTime,
    damageType?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.level = level;
    this.classes = classes;
    this.school = school;
    this.target = target;
    this.castTime = castTime;
    this.isRitual = isRitual;
    this.requiresConc = isConcentration;
    this.source = source;
    this.range = range;
    this.components = components;
    this.duration = duration;
    this.damageType = damageType;
  }
}

export function buildClassArray(rawSpell: any): string[] {
  var classArray: string[] = ['All'];

  if (rawSpell.artificer) {
    classArray.push(playerClass.artificer);
  }
  if (rawSpell.bard) {
    classArray.push(playerClass.bard);
  }
  if (rawSpell.cleric) {
    classArray.push(playerClass.cleric);
  }
  if (rawSpell.druid) {
    classArray.push(playerClass.druid);
  }
  if (rawSpell.paladin) {
    classArray.push(playerClass.paladin);
  }
  if (rawSpell.ranger) {
    classArray.push(playerClass.ranger);
  }
  if (rawSpell.sorcerer) {
    classArray.push(playerClass.sorcerer);
  }
  if (rawSpell.warlock) {
    classArray.push(playerClass.warlock);
  }
  if (rawSpell.wizard) {
    classArray.push(playerClass.wizard);
  }
  return classArray;
}

export class SpellTime {
  amount: number;
  unit: timeUnit;
  plural: boolean;
  shouldSkipAmount: boolean;

  constructor(amount: number, unit: timeUnit) {
    this.amount = amount;
    this.unit = unit;
    this.plural = amount > 1;
    switch (unit) {
      case timeUnit.second:
      case timeUnit.minute:
      case timeUnit.hour:
      case timeUnit.day:
      case timeUnit.week:
      case timeUnit.year:
        this.shouldSkipAmount = false;
        break;
      case timeUnit.special:
      case timeUnit.action:
      case timeUnit.bonusAction:
      case timeUnit.reaction:
        this.shouldSkipAmount = true;
    }
  }

  toString(): string {
    return !this.shouldSkipAmount
      ? this.amount.toString() + ' ' + printTimeUnit(this.unit, false, true)
      : printTimeUnit(this.unit, false, true);
  }

  toStringShort(): string {
    return !this.shouldSkipAmount
      ? this.amount.toString() + ' ' + printTimeUnit(this.unit, true, true)
      : printTimeUnit(this.unit, true, true);
  }

  color(): string {
    switch (this.unit) {
      case timeUnit.second:
      case timeUnit.minute:
      case timeUnit.hour:
      case timeUnit.day:
      case timeUnit.week:
      case timeUnit.year:
        return 'green';
      case timeUnit.special:
        return 'pink';
      case timeUnit.action:
        return 'blue';
      case timeUnit.bonusAction:
        return 'cyan';
      case timeUnit.reaction:
        return 'grape';
    }
  }
}

export class SpellRange {
  amount: number;
  unit: rangeUnit;

  constructor(amount: number, unit: rangeUnit) {
    this.amount = amount;
    this.unit = unit;
  }
}

export enum target {
  self,
  single,
  multi,
  aoe,
}

export enum timeUnit {
  second,
  minute,
  hour,
  day,
  week,
  year,
  special,
  action,
  bonusAction,
  reaction,
}

export const spellTimeMap = new Map<string, timeUnit>([
  ['Second', timeUnit.second],
  ['Minute', timeUnit.minute],
  ['Hour', timeUnit.hour],
  ['Day', timeUnit.day],
  ['Week', timeUnit.week],
  ['Year', timeUnit.year],
  ['Special', timeUnit.special],
  ['Action', timeUnit.action],
  ['Bonus Action', timeUnit.bonusAction],
  ['Reaction', timeUnit.reaction],
]);

export function printTimeUnit(unit: timeUnit, short: boolean, plural: boolean): string {
  switch (unit) {
    case timeUnit.second:
      return short ? 'Sec' : plural ? 'Seconds' : 'Second';
    case timeUnit.minute:
      return short ? 'Min' : plural ? 'Seconds' : 'Second';
    case timeUnit.hour:
      return short ? 'Hr' : plural ? 'Seconds' : 'Second';
    case timeUnit.day:
      return short ? 'D' : plural ? 'Seconds' : 'Second';
    case timeUnit.week:
      return short ? 'Wk' : plural ? 'Seconds' : 'Second';
    case timeUnit.year:
      return short ? 'Yr' : plural ? 'Seconds' : 'Second';
    case timeUnit.special:
      return short ? 'Sp' : plural ? 'Special' : 'Special';
    case timeUnit.action:
      return short ? 'A' : plural ? 'Actions' : 'Action';
    case timeUnit.bonusAction:
      return short ? 'BA' : plural ? 'Bonus Actions' : 'Bonus Action';
    case timeUnit.reaction:
      return short ? 'R' : plural ? 'Reactions' : 'Reaction';
  }
}

export enum rangeUnit {
  feet,
  miles,
  self,
}

export const spellLevel: { [key: string]: string } = {
  all: 'All',
  cantrip: 'Cantrips',
  level1: '1',
  level2: '2',
  level3: '3',
  level4: '4',
  level5: '5',
  level6: '6',
  level7: '7',
  level8: '8',
  level9: '9',
};

export const playerClass: { [key: string]: string } = {
  all: 'All',
  artificer: 'Artificer',
  bard: 'Bard',
  cleric: 'Cleric',
  druid: 'Druid',
  paladin: 'Paladin',
  ranger: 'Ranger',
  sorcerer: 'Sorcerer',
  warlock: 'Warlock',
  wizard: 'Wizard',
};
