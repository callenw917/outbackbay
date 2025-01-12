'use client';

import { CardViewSelector } from '../CardViewSelector/CardViewSelector';
import { SpellLevelSelector } from '../SpellLevelSelector/SpellLevelSelector';
import styles from './SpellFilterPill.module.css';
import {
  IconBrain,
  IconCandle,
  IconLetterA,
  IconLetterB,
  IconLetterM,
  IconLetterR,
  IconLetterS,
  IconLetterV,
} from '@tabler/icons-react';
import SpellFilterButton from '../SpellFilterButton/SpellFilterButton';
import { useContext } from 'react';
import { SpellFilterContext, FilterStateObject } from '@/app/spells/state-provider';
import { Divider } from '@mantine/core';

export default function SpellFilterPill() {
  const { spellFiltering, setSpellFiltering } = useContext(SpellFilterContext) as {
    spellFiltering: FilterStateObject;
    setSpellFiltering: Function;
  };

  return (
    <div className={styles.container}>
      <SpellLevelSelector visibleFrom="" />
      <CardViewSelector />
      <div className={styles.filterButtons}>
        <SpellFilterButton
          color="yellow"
          variant="filled"
          spellFilteringType="setShowConcentration"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showConcentration}
          tooltip="Concentration"
        >
          <IconBrain />
        </SpellFilterButton>
        <SpellFilterButton
          color="indigo"
          variant="filled"
          spellFilteringType="setShowRituals"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showRituals}
          tooltip="Ritual"
        >
          <IconCandle />
        </SpellFilterButton>

        <Divider size="sm" orientation="vertical" />

        {/* Spell Component Filtering. All on by default, turn off to filter */}
        <SpellFilterButton
          color="grey"
          variant="light"
          spellFilteringType="setShowVerbal"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showVerbal}
          tooltip="Verbal"
        >
          <IconLetterV />
        </SpellFilterButton>
        <SpellFilterButton
          color="grey"
          variant="light"
          spellFilteringType="setShowSomatic"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showSomatic}
          tooltip="Somatic"
        >
          <IconLetterS />
        </SpellFilterButton>
        <SpellFilterButton
          color="grey"
          variant="light"
          spellFilteringType="setShowMaterial"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showMaterial}
          tooltip="Material"
        >
          <IconLetterM />
        </SpellFilterButton>

        <Divider size="sm" orientation="vertical" />

        <SpellFilterButton
          color="blue"
          variant="filled"
          spellFilteringType="setShowActions"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showActions}
          tooltip="Action"
        >
          <IconLetterA />
        </SpellFilterButton>
        <SpellFilterButton
          color="cyan"
          variant="filled"
          spellFilteringType="setShowBonusActions"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showBonusActions}
          tooltip="Bonus Action"
        >
          <IconLetterB />
        </SpellFilterButton>
        <SpellFilterButton
          color="grape"
          variant="filled"
          spellFilteringType="setShowReactions"
          setSpellFiltering={setSpellFiltering}
          isSelected={spellFiltering.showReactions}
          tooltip="Reaction"
        >
          <IconLetterR />
        </SpellFilterButton>
      </div>
    </div>
  );
}
