'use client';

//#region imports
import { SpellCardSmall } from '@/components/SpellCard/Small/SpellCardSmall';
import { SpellGroup } from '@/components/SpellGroup/SpellGroup';
import {
  Spell,
  SpellRange,
  SpellTime,
  buildClassArray,
  cardViews,
  rangeUnit,
  rangeUnitMap,
  spellLevel,
  spellTimeMap,
  timeUnit,
} from '@/shared/lib/spell';
import { useContext, useState } from 'react';
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
var spellLevels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function SpellPage(props: spellViewerProps) {
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

  var spells: Spell[] = [];

  // Build the spell objects from the raw data
  props.rawSpells.forEach((rawSpell: any) => {
    var classArray: string[] = buildClassArray(rawSpell);
    var castTime: SpellTime | undefined = undefined;
    if (rawSpell.casting_time_amount && rawSpell.casting_time_unit) {
      castTime = new SpellTime(
        rawSpell.casting_time_amount,
        spellTimeMap.get(rawSpell.casting_time_unit) || timeUnit.special
      );
    }
    var spellRange: SpellRange | undefined = undefined;
    if (rawSpell.range_amount && rawSpell.range_unit) {
      spellRange = new SpellRange(
        rawSpell.range_amount,
        rangeUnitMap.get(rawSpell.range_unit) || rangeUnit.feet
      );
    }
    var spellDuration: SpellTime | undefined = undefined;
    if (rawSpell.duration_amount && rawSpell.duration_unit) {
      spellDuration = new SpellTime(
        rawSpell.duration_amount,
        spellTimeMap.get(rawSpell.duration_unit) || timeUnit.special
      );
    }
    spells.push(
      new Spell(
        rawSpell.id,
        rawSpell.name,
        rawSpell.details,
        rawSpell.level,
        classArray,
        rawSpell.verbal,
        rawSpell.somatic,
        rawSpell.material,
        '',
        undefined,
        castTime,
        rawSpell.ritual,
        rawSpell.concentration,
        '',
        spellRange,
        rawSpell.material_object,
        spellDuration
      )
    );
  });

  return (
    <>
      <div className="mainArea">
        <div className="spellCardArea">
          {spellLevels.map(
            (level: number) =>
              (spellFiltering.selectedLevel == spellLevel.all ||
                spellFiltering.selectedLevel == level.toString()) && (
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

function getSortedSpells(spells: Spell[], level: number, selectedClass: string): Spell[] {
  var sortedSpells: Spell[] = [];
  if (!spells) {
    return sortedSpells;
  }

  for (const spell of spells) {
    if (spell.level == level && spell.classes?.includes(selectedClass)) {
      sortedSpells.push(spell);
    }
  }

  return sortedSpells;
}
