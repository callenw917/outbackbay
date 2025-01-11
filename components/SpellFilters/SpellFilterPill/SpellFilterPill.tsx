'use client';

import { CardViewSelector } from '../CardViewSelector/CardViewSelector';
import { SpellLevelSelector } from '../SpellLevelSelector/SpellLevelSelector';
import styles from './SpellFilterPill.module.css';
import { IconBrain, IconCandle, IconLetterA, IconLetterB, IconLetterR } from '@tabler/icons-react';
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
          value={spellFiltering.showConcentration.toString()}
          tooltip="Concentration"
        >
          <IconBrain />
        </SpellFilterButton>
        <SpellFilterButton
          color="indigo"
          variant="filled"
          spellFilteringType="setShowRituals"
          setSpellFiltering={setSpellFiltering}
          value={spellFiltering.showRituals.toString()}
          tooltip="Ritual"
        >
          <IconCandle />
        </SpellFilterButton>

        <Divider size="sm" orientation="vertical" />

        <SpellFilterButton
          color="blue"
          variant="filled"
          spellFilteringType="setShowActions"
          setSpellFiltering={setSpellFiltering}
          value={spellFiltering.showActions.toString()}
          tooltip="Action"
        >
          <IconLetterA />
        </SpellFilterButton>
        <SpellFilterButton
          color="cyan"
          variant="filled"
          spellFilteringType="setShowBonusActions"
          setSpellFiltering={setSpellFiltering}
          value={spellFiltering.showBonusActions.toString()}
          tooltip="Bonus Action"
        >
          <IconLetterB />
        </SpellFilterButton>
        <SpellFilterButton
          color="grape"
          variant="filled"
          spellFilteringType="setShowReactions"
          setSpellFiltering={setSpellFiltering}
          value={spellFiltering.showReactions.toString()}
          tooltip="Reaction"
        >
          <IconLetterR />
        </SpellFilterButton>
      </div>
    </div>
  );
}
