import { Welcome } from '@/components/Welcome/Welcome';
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';
import { SpellCard } from '@/components/SpellCard/SpellCard';
import 'public/global.css';
import { SpellGroup } from '@/components/SpellGroup/SpellGroup';
import { Spell, target, timeUnit, rangeUnit } from '@/shared/lib/spell';
import { SpellCardCustom } from '@/components/SpellCard/SpellCardCustom';

export default function SpellPage() {

  var spellList:Spell[] = createTestSpells();

  return (
    <>
      <div className='mainArea'>
        <Welcome />
        <SpellLevelSelector/>
        <div className='spellCardArea'>
          <SpellGroup spellLevel='Cantrips'>
            {spellList.map(spell => (
              <SpellCard spell={spell} />
            ))}
            <SpellCardCustom name="Prestidigitation"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 1'>
            <SpellCardCustom name="Shield"/>
            <SpellCardCustom name="Chromatic Orb"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 2'>
            <SpellCardCustom name="Web"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 3'>
            <SpellCardCustom name="Fireball"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 4'>
            <SpellCardCustom name="Hold Monster"/>
          </SpellGroup> 
        </div>
      </div>
    </>
  );
}

function createTestSpells(): Spell[]
{
  var spellList:Spell[] = [];

  var burningHands:Spell = new Spell(
    "Burning Hands",
    "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one." +
    "The fire ignites any flammable objects in the area that aren't being worn or carried.",
    0,
    "Evocation",
    target.single,
    {amount: 1, unit: timeUnit.action},
    false,
    false,
    "phb",
    {amount: 15, unit: rangeUnit.feet},
    "V, S",
    {amount: 1, unit: timeUnit.action},
    "fire"
  )

  var coneOfCold:Spell = new Spell(
    "Cone of Cold",
    "Open your hands and out comes some cold. Burr!",
    0,
    "Evocation",
    target.single,
    {amount: 1, unit: timeUnit.action},
    false,
    false,
    "phb",
    {amount: 15, unit: rangeUnit.feet},
    "V, S",
    {amount: 1, unit: timeUnit.action},
    "fire"
  )

  spellList.push(burningHands);
  spellList.push(coneOfCold);

  return spellList;
}

/*
    While on 'all' we'll default to smaller cards in a column format. The description of the spell will be collapsed but expandable.
    If clicking on a specific spell level, we'll switch to a single column view with much more detail per spell, not requiring a button to expand the description.

*/