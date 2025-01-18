import SpellFilterPill from '@/components/SpellFilters/SpellFilterPill/SpellFilterPill';
import SpellViewerCharacter from '@/components/SpellViewer/SpellViewerCharacter';
import { CharacterSpell } from '@/shared/lib/Character';
import { getSpellsForCharacter } from '@/shared/lib/PrismaConnection';
import { buildSpellObject } from '@/shared/lib/Spell';
import { redirect } from 'next/navigation';

export default async function SpellPage({ params }: { params: { characterId: string } }) {
  const characterId = Array.isArray(params.characterId)
    ? params.characterId[0]
    : params.characterId;

  if (!characterId) {
    // Redirect back to /spells
    redirect('/spells');
  }

  const rawCharacterSpells = await getSpellsForCharacter(parseInt(characterId, 10));

  return (
    <>
      <div className="mainArea">
        <SpellFilterPill></SpellFilterPill>
        <SpellViewerCharacter spells={rawCharacterSpells}></SpellViewerCharacter>
      </div>
    </>
  );
}
