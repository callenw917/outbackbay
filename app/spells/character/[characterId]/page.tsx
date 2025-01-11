import SpellFilterPill from '@/components/SpellFilters/SpellFilterPill/SpellFilterPill';
import SpellFilterTray from '@/components/SpellFilters/SpellFilterTray/SpellFilterTray';
import SpellViewer from '@/components/SpellViewer/SpellViewer';
import { getSpellsForCharacter } from '@/shared/lib/PrismaConnection';
import { Group } from '@mantine/core';
import { redirect } from 'next/navigation';

export default async function SpellPage({ params }: { params: { characterId: string } }) {
  const characterId = Array.isArray(params.characterId)
    ? params.characterId[0]
    : params.characterId;

  if (!characterId) {
    // Redirect back to /spells
    redirect('/spells');
  }

  const rawSpells = await getSpellsForCharacter(parseInt(characterId, 10));

  return (
    <>
      <div className="mainArea">
        <SpellFilterPill></SpellFilterPill>
        <SpellViewer rawSpells={rawSpells}></SpellViewer>
      </div>
    </>
  );
}
