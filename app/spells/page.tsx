import SpellViewer from '@/components/SpellViewer/SpellViewer';

async function getSpells() {
  var spellJson = await fetch(process.env.NEXT_PUBLIC_URL + '/api/get-spells', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    // next: {
    //   revalidate: 5,
    // },
  });
  return spellJson.json();
}

export default async function SpellPage() {
  const rawSpells = await getSpells();
  return (
    <>
      <head>
        <title>Spells</title>
      </head>
      <SpellViewer rawSpells={rawSpells}></SpellViewer>;
    </>
  );
}

/*
    While on 'all' we'll default to smaller cards in a column format. The description of the spell will be collapsed but expandable.
    If clicking on a specific spell level, we'll switch to a single column view with much more detail per spell, not requiring a button to expand the description.
*/
