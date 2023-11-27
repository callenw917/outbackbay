const SPELL_SCHOOLS = ["Abjuration", "Necromancy", "Illusion", "Conjuration", "Evocation", "Divination", "Enchantment", "Transmutation"]

export class Spell {
    id: string;
    name: string;
    description: string;
    level: number;
    classes: string[]
    school?: string;
    isRitual?: boolean;
    isConcentration?: boolean;
    source?: string;
    target?: target;
    castTime?: SpellTime;
    range?: SpellRange;
    components?: string;
    duration?: SpellTime;
    damageType?: string;

    constructor(id: string, name: string, description: string, level: number, classes: string[], school?: string, target?: target, castTime?: SpellTime,
        isRitual?: boolean, isConcentration?: boolean, source?: string, range?: SpellRange, components?: string, duration?: SpellTime,
        damageType?: string)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.level = level;
        this.classes = classes;
        this.school = school;
        this.target = target;
        this.castTime = castTime;
        this.isRitual = isRitual;
        this.isConcentration = isConcentration;
        this.source = source;
        this.range = range;
        this.components = components;
        this.duration = duration;
        this.damageType = damageType;
    }
};

export class SpellTime 
{
    amount: number;
    unit: timeUnit;

    constructor(amount: number, unit: timeUnit)
    {
        this.amount = amount;
        this.unit = unit;
    }
}

export class SpellRange
{
    amount: number;
    unit: rangeUnit;

    constructor(amount: number, unit: rangeUnit)
    {
        this.amount = amount;
        this.unit = unit;
    }
}

export enum target {
    self,
    single,
    multi,
    aoe
};

export enum timeUnit
{
    second,
    minute,
    hour,
    day,
    week,
    year,
    special,
    action,
    bonusAction,
    reaction
};

export enum rangeUnit
{
    feet,
    miles,
    self
}

export const spellLevel: { [key: string]: string } = {
    all: "All",
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

export const playerClass: {[key: string]: string} = {
    all: "All", 
    artificer: "Artificer", 
    bard: "Bard", 
    cleric: "Cleric", 
    druid: "Druid", 
    paladin: "Paladin", 
    ranger: "Ranger", 
    sorcerer: "Sorcerer", 
    warlock: "Warlock", 
    wizard: "Wizard"
}