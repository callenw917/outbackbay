const SPELL_SCHOOLS = ["Abjuration", "Necromancy", "Illusion", "Conjuration", "Evocation", "Divination", "Enchantment", "Transmutation"]

class Spell {
    name: string;
    description: string;
    level: number;
    school: string;
    isRitual: boolean;
    isConcentration: boolean;
    source: string;
    target: target;
    castTime: SpellTime;
    range: SpellRange;
    components: string;
    duration: SpellTime;
    damageType: string;

    constructor(name: string, description: string, level: number, school: string, target: target, castTime: SpellTime,
        isRitual: boolean, isConcentration: boolean, source: string, range: SpellRange, components: string, duration: SpellTime,
        damageType: string)
    {
        this.name = name;
        this.description = description;
        this.level = level;
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

class SpellTime 
{
    amount: number;
    unit: timeUnit;

    constructor(amount: number, unit: timeUnit)
    {
        this.amount = amount;
        this.unit = unit;
    }
}

class SpellRange
{
    amount: number;
    unit: rangeUnit;

    constructor(amount: number, unit: rangeUnit)
    {
        this.amount = amount;
        this.unit = unit;
    }
}

enum target {
    self,
    single,
    multi,
    aoe
};

enum timeUnit
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

enum rangeUnit
{
    feet,
    miles,
    self
}