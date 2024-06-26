'use client';

import { Group, SegmentedControl } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { supportedSpellLevels, SpellLevel } from '@/shared/lib/spell';
import { SpellFilterContext, FilterStateObject } from '@/app/spells/state-provider';
import { useContext } from 'react';

type spellLevelSelectorType = {
  visibleFrom: string;
};

export function SpellLevelSelector(props: spellLevelSelectorType) {
  const { spellFiltering, setSpellFiltering } = useContext(SpellFilterContext) as {
    spellFiltering: FilterStateObject;
    setSpellFiltering: Function;
  };

  function spellLevelSelectHandler(value: string) {
    setSpellFiltering({ type: 'setSelectedLevel', value: value });
    window.scrollTo(0, 0);
  }

  return (
    <Group justify="center" visibleFrom={props.visibleFrom}>
      <SegmentedControl
        value={spellFiltering.selectedLevel}
        defaultValue="All"
        onChange={spellLevelSelectHandler}
        classNames={classes}
        radius="md"
        size="md"
        color="#364fc7"
        data={Array.from(supportedSpellLevels).map(function ([spellLevelEnum, level]) {
          return level.toString();
        })}
      />
    </Group>
  );
}
