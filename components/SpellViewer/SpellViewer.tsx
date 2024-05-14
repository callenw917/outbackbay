'use client';

//#region imports
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';
import { SpellLevelSelectorSmall } from '@/components/SpellLevelSelector/SpellLevelSelectorSmall';
import { SpellCardSmall } from '@/components/SpellCard/Small/SpellCardSmall';
import '@/public/global.css';
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
import { use, useState } from 'react';
import { InactiveArea } from '@/components/InactiveArea/InactiveArea';
import { Group } from '@mantine/core';
import { SpellCardDetailedView } from '@/components/SpellCardDetailedView/SpellCardDetailedView';
import { CardViewSelector } from '../CardViewSelector/CardViewSelector';
import { SpellCardLarge } from '../SpellCard/Large/SpellCardLarge';
//#endregion

type spellViewerProps = {
  rawSpells: Spell[];
};

var spellToOpen: Spell;

export default function SpellPage(props: spellViewerProps) {
  const [detailedCardVisible, setDetailedCardVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(spellLevel.all);
  const [selectedClass, setSelectedClass] = useState(playerClass.wizard);
  const [selectedView, setSelectedView] = useState(cardViews.smallCard);

  function closeDetailedViewHandler() {
    setDetailedCardVisible(false);
  }

  function openDetailedViewHandler(selectedSpell: Spell) {
    setDetailedCardVisible(true);
    spellToOpen = selectedSpell;
  }

  function levelFilterChangeHandler(selectedLevel: string) {
    setSelectedLevel(selectedLevel);
    window.scrollTo(0,0); // Scroll to the top of the page when a spell level is changed
  }

  function cardViewChangeHandler(selectedView: string) {
    setSelectedView(selectedView);
  }

  function classFilterChangeHandler(selectedClass: string) {
    setSelectedClass(selectedClass);
  }

  var spells: Spell[] = [];

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
        '',
        spellDuration
      )
    );
  });

  return (
    <>
      <div className="mainArea">
        <Group wrap="nowrap" align="flex-start" className="header">
          <ClassSelectDropdown onClick={classFilterChangeHandler} selectedClass={selectedClass} />
          <SpellLevelSelector onClick={levelFilterChangeHandler} selectedLevel={selectedLevel} visibleFrom="sm" />
          <SpellLevelSelectorSmall onClick={levelFilterChangeHandler} selectedLevel={selectedLevel} hiddenFrom="sm" />
          <CardViewSelector onClick={cardViewChangeHandler} selectedView={selectedView} />
        </Group>
        <div className="spellCardArea">
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.cantrip) && (
            <SpellGroup spellLevel="Cantrips">
              {getSortedSpells(spells, 0, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level1) && (
            <SpellGroup spellLevel="Level 1">
              {getSortedSpells(spells, 1, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level2) && (
            <SpellGroup spellLevel="Level 2">
              {getSortedSpells(spells, 2, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level3) && (
            <SpellGroup spellLevel="Level 3">
              {getSortedSpells(spells, 3, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level4) && (
            <SpellGroup spellLevel="Level 4">
              {getSortedSpells(spells, 4, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level5) && (
            <SpellGroup spellLevel="Level 5">
              {getSortedSpells(spells, 5, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level6) && (
            <SpellGroup spellLevel="Level 6">
              {getSortedSpells(spells, 6, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level7) && (
            <SpellGroup spellLevel="Level 7">
              {getSortedSpells(spells, 7, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level8) && (
            <SpellGroup spellLevel="Level 8">
              {getSortedSpells(spells, 8, selectedClass).map((spell: Spell) => (
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
          )}
          {(selectedLevel == spellLevel.all || selectedLevel == spellLevel.level9) && (
            <SpellGroup spellLevel="Level 9">
              {getSortedSpells(spells, 9, selectedClass).map((spell: Spell) => (
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
