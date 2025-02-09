/**
 * List of spell schools.
 */
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

/**
 * Represents a spell.
 */
export class Spell {
  id: string;
  name: string;
  description: string;
  level: SpellLevel;
  classes: string[];
  school?: string;
  isRitual?: boolean;
  requiresConc?: boolean;
  source?: string;
  target?: target;
  castTime?: SpellTime;
  range?: SpellRange;
  duration?: SpellTime;
  damageType?: string;
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  material_cost: string;

  /**
   * Creates a new instance of the Spell class.
   * @param id The ID of the spell.
   * @param name The name of the spell.
   * @param description The description of the spell.
   * @param level The level of the spell.
   * @param classes The classes that can cast the spell.
   * @param verbal Indicates if the spell requires verbal components.
   * @param somatic Indicates if the spell requires somatic components.
   * @param material Indicates if the spell requires material components.
   * @param school The school of the spell.
   * @param target The target type of the spell.
   * @param castTime The casting time of the spell.
   * @param isRitual Indicates if the spell can be cast as a ritual.
   * @param isConcentration Indicates if the spell requires concentration.
   * @param source The source of the spell.
   * @param range The range of the spell.
   * @param duration The duration of the spell.
   * @param damageType The type of damage the spell deals.
   */
  constructor(
    id: string,
    name: string,
    description: string,
    level: number,
    classes: string[],
    verbal: boolean,
    somatic: boolean,
    material: boolean,
    material_cost: string,
    school?: string,
    target?: target,
    castTime?: SpellTime,
    isRitual?: boolean,
    isConcentration?: boolean,
    source?: string,
    range?: SpellRange,
    duration?: SpellTime,
    damageType?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.level = new SpellLevel(level);
    this.classes = classes;
    this.school = school;
    this.target = target;
    this.castTime = castTime;
    this.isRitual = isRitual;
    this.requiresConc = isConcentration;
    this.source = source;
    this.range = range;
    this.duration = duration;
    this.damageType = damageType;
    this.verbal = verbal;
    this.somatic = somatic;
    this.material = material;
    this.material_cost = material_cost;
  }

  static cloneSpell(spell: Spell): Spell {
    return new Spell(
      spell.id,
      spell.name,
      spell.description,
      spell.level.level,
      spell.classes,
      spell.verbal,
      spell.somatic,
      spell.material,
      spell.material_cost,
      spell.school,
      spell.target,
      spell.castTime,
      spell.isRitual,
      spell.requiresConc,
      spell.source,
      spell.range,
      spell.duration
    );
  }

  /**
   * Gets the components required to cast the spell.
   * @returns The components required to cast the spell.
   */
  getComponents(): string {
    var components: string = '';
    if (this.verbal) {
      components = components + 'V';
    }
    if (this.somatic) {
      components = components + ' S';
    }
    if (this.material) {
      components = components + ' M';
    }
    if (this.material_cost) {
      components = components + ' ' + this.material_cost;
    }
    return components;
  }

  /**
   * Gets the short form of the components required to cast the spell.
   * @returns The short form of the components required to cast the spell.
   */
  getComponentsShort(): string {
    var components: string = '';
    if (this.verbal) {
      components = components + 'V';
    }
    if (this.somatic) {
      components = components + 'S';
    }
    if (this.material) {
      components = components + 'M';
    }
    return components;
  }
}

/**
 * Builds an array of Spell objects from raw spell data.
 * @param rawSpells The raw spell data.
 * @returns An array of Spell objects.
 */
export function buildSpellObjects(rawSpells: any): Spell[] {
  var spells: Spell[] = [];
  rawSpells.forEach((rawSpell: any) => {
    spells.push(buildSpellObject(rawSpell));
  });
  return spells;
}

export function buildSpellObject(rawSpell: any): Spell {
  var classArray: string[] = buildClassArray(rawSpell);
  var castTime: SpellTime | undefined = undefined;
  if (rawSpell.casting_time_amount && rawSpell.casting_time_unit) {
    castTime = new SpellTime(
      rawSpell.casting_time_amount,
      spellTimeMap.get(rawSpell.casting_time_unit) || timeUnit.special
    );
  }
  var spellRange: SpellRange | undefined = undefined;
  if (rawSpell.range_amount && rawSpell.range_unit) {
    spellRange = new SpellRange(
      rawSpell.range_amount,
      rangeUnitMap.get(rawSpell.range_unit) || rangeUnit.feet
    );
  }
  var spellDuration: SpellTime | undefined = undefined;
  if (rawSpell.duration_amount && rawSpell.duration_unit) {
    spellDuration = new SpellTime(
      rawSpell.duration_amount,
      spellTimeMap.get(rawSpell.duration_unit) || timeUnit.special
    );
  }
  return new Spell(
    rawSpell.id,
    rawSpell.name,
    rawSpell.details,
    rawSpell.level,
    classArray,
    rawSpell.verbal,
    rawSpell.somatic,
    rawSpell.material,
    rawSpell.material_object,
    '',
    undefined,
    castTime,
    rawSpell.ritual,
    rawSpell.concentration,
    '',
    spellRange,
    spellDuration
  );
}

/**
 * Builds an array of class names from raw spell data.
 * @param rawSpell The raw spell data.
 * @returns An array of class names.
 */
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

/**
 * Represents the casting time of a spell.
 */
export class SpellTime {
  amount: number;
  unit: timeUnit;
  plural: boolean;
  shouldSkipAmount: boolean;

  /**
   * Creates a new instance of the SpellTime class.
   * @param amount The amount of time.
   * @param unit The unit of time.
   */
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
      case timeUnit.instant:
      case timeUnit.action:
      case timeUnit.bonusAction:
      case timeUnit.reaction:
        this.shouldSkipAmount = true;
    }
  }

  /**
   * Returns a string representation of the SpellTime object.
   * @returns A string representation of the SpellTime object.
   */
  toString(): string {
    return !this.shouldSkipAmount
      ? this.amount.toString() + ' ' + printTimeUnit(this.unit, false, this.plural)
      : printTimeUnit(this.unit, false, this.plural);
  }

  /**
   * Returns a short string representation of the SpellTime object.
   * @returns A short string representation of the SpellTime object.
   */
  toStringShort(): string {
    return !this.shouldSkipAmount
      ? this.amount.toString() + ' ' + printTimeUnit(this.unit, true, true)
      : printTimeUnit(this.unit, true, true);
  }

  toStringLong(): string {
    return this.amount.toString() + ' ' + printTimeUnit(this.unit, false, this.plural);
  }

  /**
   * Returns the color associated with the SpellTime object.
   * @returns The color associated with the SpellTime object.
   */
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
    return 'green';
  }

  isAction(): boolean {
    return this.unit == timeUnit.action;
  }

  isBonusAction(): boolean {
    return this.unit == timeUnit.bonusAction;
  }

  isReaction(): boolean {
    return this.unit == timeUnit.reaction;
  }
}

/**
 * Represents the range of a spell.
 */
export class SpellRange {
  amount: number;
  unit: rangeUnit;
  plural: boolean;
  needsUnit: boolean;

  /**
   * Creates a new instance of the SpellRange class.
   * @param amount The amount of range.
   * @param unit The unit of range.
   */
  constructor(amount: number, unit: rangeUnit) {
    this.amount = amount;
    this.unit = unit;
    this.plural = amount > 1;
    this.needsUnit = this.unit == rangeUnit.feet || this.unit == rangeUnit.miles;
  }

  /**
   * Returns a string representation of the SpellRange object.
   * @returns A string representation of the SpellRange object.
   */
  toString(): string {
    return (this.needsUnit ? this.amount.toString() + ' ' : '') + this.printUnit(false);
  }

  /**
   * Returns a short string representation of the SpellRange object.
   * @returns A short string representation of the SpellRange object.
   */
  toStringShort(): string {
    return (this.needsUnit ? this.amount.toString() + ' ' : '') + this.printUnit(true);
  }

  /**
   * Returns the unit of the SpellRange object as a string.
   * @param short Indicates if the unit should be displayed in short form.
   * @returns The unit of the SpellRange object as a string.
   */
  printUnit(short: boolean): string {
    switch (this.unit) {
      case rangeUnit.feet:
        return short ? 'Ft' : this.plural ? 'Feet' : 'Foot';
      case rangeUnit.miles:
        return short ? 'Mi' : this.plural ? 'Miles' : 'Mile';
      case rangeUnit.self:
        return short ? 'S' : 'Self';
      case rangeUnit.touch:
        return short ? 'T' : 'Touch';
    }
  }
}

/**
 * Represents a spell level.
 */
export class SpellLevel {
  level: number;
  name: string;

  /**
   * Creates a new instance of the spellLevel class.
   * @param level The level of the spell.
   */
  constructor(level: number) {
    this.level = level;
    switch (level) {
      case -1:
        this.name = 'All Levels';
        break;
      case 0:
        this.name = 'Cantrip';
        break;
      default:
        this.name = level.toString();
    }
  }

  toString(): string {
    return this.name;
  }
}

export enum spellLevelEnum {
  all = -1,
  cantrip = 0,
  level1 = 1,
  level2 = 2,
  level3 = 3,
  level4 = 4,
  level5 = 5,
  level6 = 6,
  level7 = 7,
  level8 = 8,
  level9 = 9,
}

export const supportedSpellLevels = new Map<spellLevelEnum, SpellLevel>([
  [-1, new SpellLevel(-1)], // All (Cantrips and all levels)
  [0, new SpellLevel(0)], // Cantrips
  [1, new SpellLevel(1)], // Level 1
  [2, new SpellLevel(2)], // Level 2
  [3, new SpellLevel(3)], // Level 3
  [4, new SpellLevel(4)], // Level 4
  [5, new SpellLevel(5)], // Level 5
  [6, new SpellLevel(6)], // Level 6
  [7, new SpellLevel(7)], // Level 7
  [8, new SpellLevel(8)], // Level 8
  [9, new SpellLevel(9)], // Level 9
]);

/**
 * Represents the range units.
 */
export enum rangeUnit {
  feet,
  miles,
  self,
  touch,
}

/**
 * Map of range units.
 */
export const rangeUnitMap = new Map<string, rangeUnit>([
  ['feet', rangeUnit.feet],
  ['miles', rangeUnit.miles],
  ['Self', rangeUnit.self],
  ['Touch', rangeUnit.touch],
]);

/**
 * Represents the target types.
 */
export enum target {
  self,
  single,
  multi,
  aoe,
}

/**
 * Represents the time units.
 */
export enum timeUnit {
  second,
  minute,
  hour,
  day,
  week,
  year,
  special,
  instant,
  action,
  bonusAction,
  reaction,
}

/**
 * Map of time units.
 */
export const spellTimeMap = new Map<string, timeUnit>([
  ['Second', timeUnit.second],
  ['Minute', timeUnit.minute],
  ['Hour', timeUnit.hour],
  ['Day', timeUnit.day],
  ['Week', timeUnit.week],
  ['Year', timeUnit.year],
  ['Special', timeUnit.special],
  ['Instantaneous', timeUnit.instant],
  ['Action', timeUnit.action],
  ['Bonus Action', timeUnit.bonusAction],
  ['Reaction', timeUnit.reaction],
]);

/**
 * Returns a string representation of the time unit.
 * @param unit The time unit.
 * @param short Indicates if the unit should be displayed in short form.
 * @param plural Indicates if the unit should be displayed in plural form.
 * @returns A string representation of the time unit.
 */
export function printTimeUnit(unit: timeUnit, short: boolean, plural: boolean): string {
  switch (unit) {
    case timeUnit.second:
      return short ? 'Sec' : plural ? 'Seconds' : 'Second';
    case timeUnit.minute:
      return short ? 'Min' : plural ? 'Minutes' : 'Minute';
    case timeUnit.hour:
      return short ? 'Hr' : plural ? 'Hours' : 'Hour';
    case timeUnit.day:
      return short ? 'D' : plural ? 'Days' : 'Day';
    case timeUnit.week:
      return short ? 'Wk' : plural ? 'Weeks' : 'Week';
    case timeUnit.year:
      return short ? 'Yr' : plural ? 'Years' : 'Year';
    case timeUnit.special:
      return short ? 'Sp' : 'Special';
    case timeUnit.instant:
      return short ? 'I' : 'Instant';
    case timeUnit.action:
      return short ? 'A' : plural ? 'Actions' : 'Action';
    case timeUnit.bonusAction:
      return short ? 'BA' : plural ? 'Bonus Actions' : 'Bonus Action';
    case timeUnit.reaction:
      return short ? 'R' : plural ? 'Reactions' : 'Reaction';
  }
}

/**
 * Represents the player classes.
 */
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

/**
 * Represents the card views.
 */
export const cardViews: { [key: string]: string } = {
  smallCard: 'Small Card',
  largeCard: 'Large Card',
  list: 'List',
};
