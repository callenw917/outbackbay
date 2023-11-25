'use client'

import { Welcome } from '@/components/Welcome/Welcome';
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';
import { SpellCard } from '@/components/SpellCard/SpellCard';
import 'public/global.css';
import { SpellGroup } from '@/components/SpellGroup/SpellGroup';
import { Spell, target, timeUnit, rangeUnit } from '@/shared/lib/spell';
import { SpellCardCustom } from '@/components/SpellCard/SpellCardCustom';
import { use, useState } from 'react';
import { InactiveArea } from '@/components/InactiveArea/InactiveArea';
import prisma from '@/lib/prisma';

async function getSpells()
{ 
  //Call API here
  
  var spellJson = await fetch('https://www.outbackbay.com/api/get-spells', {
    method: "GET",
     headers: {
       Accept: 'application/json'
     },
     cache: 'no-store'
  });

  console.log(spellJson);

  return spellJson.json();
};

const spellPromise = getSpells();

export default function SpellPage() {

  const [detailedCardVisible, setDetailedCardVisible] = useState(false);

  function closeDetailedViewHandler() { 
    console.log("Closing Detailed Card");
    setDetailedCardVisible(false); 
  }

  function openDetailedViewHandler(selectedSpell: Spell)
  {
    console.log("Opening Detailed Card");
    selectedSpell = selectedSpell;
    setDetailedCardVisible(true);
  }

  var spells: Spell[] = use(spellPromise);

  return (
    <>
      <div className='mainArea'>
        <Welcome />
        <SpellLevelSelector/>
        <div className='spellCardArea'>
          <SpellGroup spellLevel='Cantrips'>  
            {getSortedSpells(spells, 0).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>
          <SpellGroup spellLevel='Level 1'>
            {getSortedSpells(spells, 1).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>
          <SpellGroup spellLevel='Level 2'>
            {getSortedSpells(spells, 2).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>
          <SpellGroup spellLevel='Level 3'>
            {getSortedSpells(spells, 3).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>
          <SpellGroup spellLevel='Level 4'>
            {getSortedSpells(spells, 4).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup>
          <SpellGroup spellLevel='Level 5'>
            {getSortedSpells(spells, 5).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup> 
          <SpellGroup spellLevel='Level 6'>
            {getSortedSpells(spells, 6).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup> 
          <SpellGroup spellLevel='Level 7'>
            {getSortedSpells(spells, 7).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup> 
          <SpellGroup spellLevel='Level 8'>
            {getSortedSpells(spells, 8).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup> 
          <SpellGroup spellLevel='Level 9'>
            {getSortedSpells(spells, 9).map((spell: any) => (
              <SpellCard key={spell.id} spell={spell} onClick={openDetailedViewHandler}/>
            ))}
          </SpellGroup> 
        </div>
      </div>
      {detailedCardVisible && <InactiveArea onClick={closeDetailedViewHandler}/>}
    </>
  );
}

function getSortedSpells(spells: Spell[], level: number): Spell[] {

  var sortedSpells: Spell[] = [];
  // if (!spells) {return sortedSpells;}

  // for (const spell of spells)
  // {
  //   if (spell.level == level)
  //   {
  //     sortedSpells.push(spell);
  //   }  
  // };
  
  return sortedSpells;
}

/*
    While on 'all' we'll default to smaller cards in a column format. The description of the spell will be collapsed but expandable.
    If clicking on a specific spell level, we'll switch to a single column view with much more detail per spell, not requiring a button to expand the description.

*/