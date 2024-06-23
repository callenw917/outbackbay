'use client';

//#region imports
import { SpellCardSmall } from '@/components/SpellCard/Small/SpellCardSmall';
import { SpellGroup } from '@/components/SpellGroup/SpellGroup';
import {
  Spell,
  buildSpellObjects,
  cardViews,
  SpellLevel,
  spellLevelEnum,
  supportedSpellLevels,
} from '@/shared/lib/spell';
import { useState } from 'react';
import { InactiveArea } from '@/components/InactiveArea/InactiveArea';
import { SpellCardDetailedView } from '@/components/SpellCardDetailedView/SpellCardDetailedView';
import { SpellCardLarge } from '../SpellCard/Large/SpellCardLarge';
import { SpellFilterContext, StateObject } from '@/app/spells/state-provider';
import React from 'react';
//#endregion

type spellViewerProps = {
  rawSpells: Spell[];
};

var spellToOpen: Spell;

export default function SpellPage({ rawSpells }: spellViewerProps) {
  const [detailedCardVisible, setDetailedCardVisible] = useState(false);
  const { spellFiltering, setSpellFiltering } = React.useContext(SpellFilterContext) as {
    spellFiltering: StateObject;
    setSpellFiltering: Function;
  };

  function closeDetailedViewHandler() {
    setDetailedCardVisible(false);
  }

  // Open the detailed view of a spell
  function openDetailedViewHandler(selectedSpell: Spell) {
    setDetailedCardVisible(true);
    spellToOpen = selectedSpell;
  }

  // Build the spell objects from the raw data
  var spells = buildSpellObjects(rawSpells);

  return (
    <>
      <div className="mainArea">
        <div className="spellCardArea">
          {Array.from(supportedSpellLevels.values()).map(
            (level) =>
              (spellFiltering.selectedLevel ==
                supportedSpellLevels.get(spellLevelEnum.all)?.toString() ||
                spellFiltering.selectedLevel == level.toString()) &&
              level.level != -1 && (
                <SpellGroup spellLevel={level.toString()}>
                  {getSortedSpells(spells, level, spellFiltering.selectedClass).map(
                    (spell: Spell) => (
                      <>
                        {spellFiltering.selectedView == cardViews.smallCard && (
                          <SpellCardSmall
                            key={spell.id}
                            spell={spell as Spell}
                            onClick={openDetailedViewHandler}
                          />
                        )}
                        {spellFiltering.selectedView == cardViews.largeCard && (
                          <SpellCardLarge
                            key={spell.id}
                            spell={spell as Spell}
                            onClick={openDetailedViewHandler}
                          />
                        )}
                      </>
                    )
                  )}
                </SpellGroup>
              )
          )}
        </div>
      </div>
      <SpellCardDetailedView
        spell={spellToOpen}
        opened={detailedCardVisible}
        close={closeDetailedViewHandler}
      ></SpellCardDetailedView>
      {detailedCardVisible && <InactiveArea onClick={closeDetailedViewHandler} />}
    </>
  );
}

function getSortedSpells(spells: Spell[], level: SpellLevel, selectedClass: string): Spell[] {
  var sortedSpells: Spell[] = [];
  if (!spells) {
    return sortedSpells;
  }

  for (const spell of spells) {
    if (spell.level.toString() == level.toString() && spell.classes?.includes(selectedClass)) {
      sortedSpells.push(spell);
    }
  }

  return sortedSpells;
}
