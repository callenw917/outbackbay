'use client';

//#region imports
import { SpellCardSmall } from '@/components/SpellCard/Small/SpellCardSmall';
import { SpellGroupNarrow } from '@/components/SpellGroup/SpellGroupNarrow';
import {
  Spell,
  buildSpellObjects,
  cardViews,
  SpellLevel,
  spellLevelEnum,
  supportedSpellLevels,
} from '@/shared/lib/Spell';
import { useContext, useState } from 'react';
import { InactiveArea } from '@/components/InactiveArea/InactiveArea';
import { SpellCardModal } from '@/components/SpellCardModal/SpellCardModal';
import { SpellCardLarge } from '../SpellCard/Large/SpellCardLarge';
import {
  SpellFilterContext,
  FilterStateObject,
  spellSearchContext,
  SpellSearchStateObject,
} from '@/app/spells/state-provider';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { handleSpellSave } from '@/shared/lib/PrismaConnection';
//#endregion

type spellViewerProps = {
  spells: Spell[];
};

var spellToOpen: Spell;

export default function SpellViewer({ spells }: spellViewerProps) {
  const [detailedCardVisible, setDetailedCardVisible] = useState(false);
  const { spellFiltering, setSpellFiltering } = useContext(SpellFilterContext) as {
    spellFiltering: FilterStateObject;
    setSpellFiltering: Function;
  };
  const { spellSearch, setSpellSearch } = useContext(spellSearchContext) as {
    spellSearch: SpellSearchStateObject;
    setSpellSearch: Function;
  };

  function closeDetailedViewHandler() {
    setDetailedCardVisible(false);
  }

  // Open the detailed view of a spell
  function openDetailedViewHandler(selectedSpell: Spell) {
    setDetailedCardVisible(true);
    spellToOpen = selectedSpell;
  }

  if (spellSearch.searchTerm != '') {
    spells = spells.filter((spell) =>
      spell.name.toLowerCase().includes(spellSearch.searchTerm.toLowerCase())
    );
  }

  spells = buildSpellObjects(spells);
  spells = getFilteredSpells(spells, spellFiltering);

  // Only display the spell groups that have spells in them
  const spellGroupsToDisplay = new Set<SpellLevel>();
  const addedSpellLevels = new Set<number>();
  spells.forEach((spell) => {
    if (!addedSpellLevels.has(spell.level.level)) {
      spellGroupsToDisplay.add(spell.level);
      addedSpellLevels.add(spell.level.level);
    }
  });

  return (
    <>
      <div className="spellCardArea">
        {Array.from(supportedSpellLevels.values()).map(
          (level) =>
            (spellFiltering.selectedLevel ==
              supportedSpellLevels.get(spellLevelEnum.all)?.toString() ||
              spellFiltering.selectedLevel == level.toString()) &&
            addedSpellLevels.has(level.level) &&
            level.level != -1 && (
              <SpellGroupNarrow spellLevel={level.toString()} key={level.toString()}>
                {getSortedSpells(spells, level).map((spell: Spell) => (
                  <>
                    {spellFiltering.selectedView == cardViews.smallCard && (
                      <SpellCardSmall
                        key={spell.id}
                        spell={spell as Spell}
                        onClick={openDetailedViewHandler}
                        prepared={false}
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
                ))}
              </SpellGroupNarrow>
            )
        )}
      </div>
      <SessionProvider>
        <SpellCardModal
          spell={spellToOpen}
          opened={detailedCardVisible}
          close={closeDetailedViewHandler}
          onSave={handleSpellSave}
        ></SpellCardModal>
      </SessionProvider>
      {detailedCardVisible && <InactiveArea onClick={closeDetailedViewHandler} />}
    </>
  );
}

function getFilteredSpells(spells: Spell[], filters: FilterStateObject): Spell[] {
  var filteredSpells: Spell[] = [];

  if (!spells) {
    return filteredSpells;
  }

  for (const spell of spells) {
    // Filter for Class
    if (!spell.classes?.includes(filters.selectedClass)) {
      continue;
    }

    // Filter for Concentration/Ritual
    if (filters.showRituals || filters.showConcentration) {
      if (filters.showRituals && !spell.isRitual) {
        if ((filters.showConcentration && !spell.requiresConc) || !filters.showConcentration) {
          continue;
        }
      } else if (filters.showConcentration && !spell.requiresConc) {
        continue;
      }
    }

    // Filter for Components
    if (!filters.showVerbal && spell.verbal) {
      continue;
    }
    if (!filters.showSomatic && spell.somatic) {
      continue;
    }
    if (!filters.showMaterial && spell.material) {
      continue;
    }

    // Filter for Action Cost
    if (filters.showActions || filters.showBonusActions || filters.showReactions) {
      if (filters.showActions && spell.castTime?.isAction()) {
        filteredSpells.push(spell);
      }
      if (filters.showBonusActions && spell.castTime?.isBonusAction()) {
        filteredSpells.push(spell);
      }
      if (filters.showReactions && spell.castTime?.isReaction()) {
        filteredSpells.push(spell);
      }
      // Else, show all spells
    } else {
      filteredSpells.push(spell);
    }
  }

  return filteredSpells;
}

function getSortedSpells(spells: Spell[], level: SpellLevel): Spell[] {
  var sortedSpells: Spell[] = [];
  if (!spells) {
    return sortedSpells;
  }

  for (const spell of spells) {
    if (spell.level.toString() == level.toString()) {
      sortedSpells.push(spell);
    }
  }

  return sortedSpells;
}
