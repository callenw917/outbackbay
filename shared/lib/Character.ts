import { Spell } from './Spell';

export class Character {
  id: number;
  name: string;
  level: number;
  class: string;
  spells: CharacterSpell[] = [];

  constructor(id: number, name: string, level: number, classType: string) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.class = classType;
    this.spells = [];
  }

  addSpell(spell: CharacterSpell) {
    this.spells.push(spell);
  }

  removeSpell(spell: Spell) {
    this.spells = this.spells.filter((s) => s.spell.id !== spell.id);
  }

  hasSpell(spell: Spell) {
    return this.spells.some((s) => s.spell.id === spell.id);
  }

  getSpellCount() {
    return this.spells.length;
  }

  getSpells() {
    return this.spells;
  }

  getPreparedSpells() {
    return this.spells.filter((s) => s.prepared);
  }
}

export class CharacterSpell {
  spell: Spell;
  prepared: boolean;

  constructor(spell: Spell, prepared: boolean) {
    this.spell = spell;
    this.prepared = prepared;
  }
}
