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
//#endregion

type spellViewerProps = {
  rawSpells: Spell[];
};

var spellToOpen: Spell;

export default function SpellViewer({ rawSpells }: spellViewerProps) {
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

  // Build the spell objects from the raw data
  var spells = buildSpellObjects(rawSpells);

  if (spellSearch.searchTerm != '') {
    spells = spells.filter((spell) =>
      spell.name.toLowerCase().includes(spellSearch.searchTerm.toLowerCase())
    );
  }

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

  console.log(spellGroupsToDisplay);

  return (
    <>
      <div className="spellCardArea">
        {Array.from(spellGroupsToDisplay.values()).map(
          (level) =>
            (spellFiltering.selectedLevel ==
              supportedSpellLevels.get(spellLevelEnum.all)?.toString() ||
              spellFiltering.selectedLevel == level.toString()) &&
            level.level != -1 && (
              <SpellGroupNarrow spellLevel={level.toString()} key={level.toString()}>
                {getSortedSpells(spells, level).map((spell: Spell) => (
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
                ))}
              </SpellGroupNarrow>
            )
        )}
      </div>
      <SpellCardModal
        spell={spellToOpen}
        opened={detailedCardVisible}
        close={closeDetailedViewHandler}
      ></SpellCardModal>
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
    if (spell.classes?.includes(filters.selectedClass)) {
      if (filters.showRituals || filters.showConcentration) {
        if (filters.showRituals && !spell.isRitual) {
          if ((filters.showConcentration && !spell.requiresConc) || !filters.showConcentration) {
            continue;
          }
        } else if (filters.showConcentration && !spell.requiresConc) {
          continue;
        }
      }
      // If the user has selected a specific level, only show spells of that level
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
