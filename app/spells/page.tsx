import SpellFilterPill from '@/components/SpellFilters/SpellFilterPill/SpellFilterPill';
import SpellFilterTray from '@/components/SpellFilters/SpellFilterTray/SpellFilterTray';
import SpellViewer from '@/components/SpellViewer/SpellViewer';
import { buildSpellObjects } from '@/shared/lib/Spell';
import { Group } from '@mantine/core';

async function getSpells() {
  var spellJson = await fetch(process.env.NEXT_PUBLIC_URL + '/api/get-spells', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return spellJson.json();
}

export default async function SpellPage() {
  const spells = await getSpells();

  return (
    <>
      <div className="mainArea">
        <SpellFilterPill></SpellFilterPill>
        <SpellViewer spells={spells}></SpellViewer>
      </div>
    </>
  );
}
