import { Welcome } from '@/components/Welcome/Welcome';
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';
import { SpellCard } from '@/components/SpellCard/SpellCard';
import 'public/global.css';
import { SpellGroup } from '@/components/SpellGroup/SpellGroup';

export default function SpellPage() {
  return (
    <>
      <div className='mainArea'>
        <Welcome />
        <SpellLevelSelector/>
        <div className='spellCardArea'>
          <SpellGroup spellLevel='Cantrips'>
            <SpellCard name="Minor Illusion" />
            <SpellCard name="Prestidigitation"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 1'>
          <SpellCard name="Shield"/>
          <SpellCard name="Chromatic Orb"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 2'>
            <SpellCard name="Web"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 3'>
            <SpellCard name="Fireball"/>
          </SpellGroup>
          <SpellGroup spellLevel='Level 4'>
            <SpellCard name="Hold Monster"/>
          </SpellGroup> 
        </div>
      </div>
    </>
  );
}

/*
    While on 'all' we'll default to smaller cards in a column format. The description of the spell will be collapsed but expandable.
    If clicking on a specific spell level, we'll switch to a single column view with much more detail per spell, not requiring a button to expand the description.

*/