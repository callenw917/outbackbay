'use client';

//#region imports
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';
import { SpellLevelSelectorSmall } from '@/components/SpellLevelSelector/SpellLevelSelectorSmall';
import { SpellCardSmall } from '@/components/SpellCard/Small/SpellCardSmall';
import { SpellGroup } from '@/components/SpellGroup/SpellGroup';
import { ClassSelectDropdown } from '@/components/ClassSelectDropdown/ClassSelectDropdown';
import {
  Spell,
  SpellRange,
  SpellTime,
  buildClassArray,
  cardViews,
  playerClass,
  rangeUnit,
  rangeUnitMap,
  spellLevel,
  spellTimeMap,
  timeUnit,
} from '@/shared/lib/spell';
import { ComponentType, use, useState } from 'react';
import { InactiveArea } from '@/components/InactiveArea/InactiveArea';
import { Button, Group } from '@mantine/core';
import { SpellCardDetailedView } from '@/components/SpellCardDetailedView/SpellCardDetailedView';
import { CardViewSelector } from '../CardViewSelector/CardViewSelector';
import { SpellCardLarge } from '../SpellCard/Large/SpellCardLarge';
//#endregion

type spellViewerProps = {
  rawSpells: Spell[];
  children: any;
};

var spellToOpen: Spell;
var spellLevels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function SpellPage(props: spellViewerProps) {
  const [detailedCardVisible, setDetailedCardVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(spellLevel.all);
  const [selectedClass, setSelectedClass] = useState(playerClass.wizard);
  const [selectedView, setSelectedView] = useState(cardViews.smallCard);

  function closeDetailedViewHandler() {
    setDetailedCardVisible(false);
  }

  // Open the detailed view of a spell
  function openDetailedViewHandler(selectedSpell: Spell) {
    setDetailedCardVisible(true);
    spellToOpen = selectedSpell;
  }

  // Filter the spells by level
  function levelFilterChangeHandler(selectedLevel: string) {
    setSelectedLevel(selectedLevel);
    window.scrollTo(0,0); // Scroll to the top of the page when a spell level is changed
  }

  // Filter the spells by class
  function classFilterChangeHandler(selectedClass: string) {
    setSelectedClass(selectedClass);
  }

  // Change the view of the spell cards
  function cardViewChangeHandler(selectedView: string) {
    setSelectedView(selectedView);
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
        <Group wrap="nowrap" align="center" className="header" justify='space-between'>
          {props.children}
          <ClassSelectDropdown onClick={classFilterChangeHandler} selectedClass={selectedClass} />
          <SpellLevelSelector onClick={levelFilterChangeHandler} selectedLevel={selectedLevel} visibleFrom="sm" />
          <SpellLevelSelectorSmall onClick={levelFilterChangeHandler} selectedLevel={selectedLevel} hiddenFrom="sm" />
          <CardViewSelector onClick={cardViewChangeHandler} selectedView={selectedView} />
          <Button color="blue" radius="md" component="a" href="/spells/login">Sign In</Button>
        </Group>
        <div className="spellCardArea">
          {spellLevels.map((level: number) => (
            (selectedLevel == spellLevel.all || selectedLevel == level.toString()) && (
            <SpellGroup spellLevel={level.toString()}>
              {getSortedSpells(spells, level, selectedClass).map((spell: Spell) => (
                <>
                  {selectedView == cardViews.smallCard && <SpellCardSmall
                    key={spell.id}
                    spell={spell as Spell}
                    onClick={openDetailedViewHandler}
                  />}
                  {selectedView == cardViews.largeCard && <SpellCardLarge 
                    key={spell.id}
                    spell={spell as Spell}
                    onClick={openDetailedViewHandler}
                  />}
                </>
              ))}
            </SpellGroup>
          )))}
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
