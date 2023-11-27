'use client'

import { Welcome } from '@/components/Welcome/Welcome';
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';
import { SpellCard } from '@/components/SpellCard/SpellCard';
import 'public/global.css';
import { SpellGroup } from '@/components/SpellGroup/SpellGroup';
import { ClassSelectDropdown } from '@/components/ClassSelectDropdown/ClassSelectDropdown';
import { Spell, playerClass, spellLevel } from '@/shared/lib/spell';
import { use, useState } from 'react';
import { InactiveArea } from '@/components/InactiveArea/InactiveArea';

async function getSpells()
{ 
  var spellJson = await fetch(process.env.NEXT_PUBLIC_URL + '/api/get-spells', {
    method: "GET",
     headers: {
       Accept: 'application/json'
     },
     cache: 'no-store'
  });

  return spellJson.json();
};

const spellPromise = getSpells();

export default function SpellPage() {

  const [detailedCardVisible, setDetailedCardVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(spellLevel.all)
  const [selectedClass, setSelectedClass] = useState(playerClass.wizard);

  function closeDetailedViewHandler() { setDetailedCardVisible(false); }

  function openDetailedViewHandler(selectedSpell: Spell) { setDetailedCardVisible(true); }

  function levelFilterChangeHandler(selectedLevel: string) { setSelectedLevel(selectedLevel); }

  function classFilterChangeHandler(selectedClass: string) { setSelectedClass(selectedClass); }

  var spells: Spell[] = use(spellPromise);

  return (
    <>
      <div className='mainArea'>
        <Welcome />
        <ClassSelectDropdown onClick={classFilterChangeHandler} selectedClass={selectedClass}/>
        <SpellLevelSelector onClick={levelFilterChangeHandler} selectedLevel={selectedLevel}/>
        <div className='spellCardArea'>
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.cantrip) &&
          <SpellGroup spellLevel='Cantrips'>  
            {getSortedSpells(spells, 0, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level1) &&
          <SpellGroup spellLevel='Level 1'>
            {getSortedSpells(spells, 1, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level2) &&
          <SpellGroup spellLevel='Level 2'>
            {getSortedSpells(spells, 2, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level3) &&
          <SpellGroup spellLevel='Level 3'>
            {getSortedSpells(spells, 3, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level4) &&
          <SpellGroup spellLevel='Level 4'>
            {getSortedSpells(spells, 4, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level5) &&
          <SpellGroup spellLevel='Level 5'>
            {getSortedSpells(spells, 5, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level6) &&
          <SpellGroup spellLevel='Level 6'>
            {getSortedSpells(spells, 6, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level7) &&
          <SpellGroup spellLevel='Level 7'>
            {getSortedSpells(spells, 7, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level8) &&
          <SpellGroup spellLevel='Level 8'>
            {getSortedSpells(spells, 8, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level9) &&
          <SpellGroup spellLevel='Level 9'>
            {getSortedSpells(spells, 9, selectedClass).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>}
        </div>
      </div>
      {detailedCardVisible && <InactiveArea onClick={closeDetailedViewHandler}/>}
    </>
  );
}

function getSortedSpells(spells: Spell[], level: number, selectedClass: string): Spell[] {

  var sortedSpells: Spell[] = [];
  if (!spells) {return sortedSpells;}

  for (const spell of spells)
  {
    if (spell.level == level && spell.classes.includes(selectedClass))
    {
      sortedSpells.push(spell);
    }  
  };
  
  return sortedSpells;
}

/*
    While on 'all' we'll default to smaller cards in a column format. The description of the spell will be collapsed but expandable.
    If clicking on a specific spell level, we'll switch to a single column view with much more detail per spell, not requiring a button to expand the description.
*/