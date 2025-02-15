import SpellFilterPill from '@/components/SpellFilters/SpellFilterPill/SpellFilterPill';
import SpellViewerCharacter from '@/components/SpellViewer/SpellViewerCharacter';
import { getSpellsForCharacter } from '@/shared/lib/PrismaConnection';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; // Make sure getSpellsForCharacter will not grab cached data
export const fetchCache = 'force-no-store';

export default async function SpellPage({ params }: { params: { characterId: string } }) {
  const characterId = Array.isArray(params.characterId)
    ? params.characterId[0]
    : params.characterId;

  if (!characterId) {
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
