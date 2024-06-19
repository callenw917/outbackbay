'use client';

import { Select } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { spellLevel } from '@/shared/lib/spell';
import { SpellFilterContext, StateObject } from '@/app/spells/state-provider';
import { useContext } from 'react';

type spellLevelSelectorType = {
  hiddenFrom: string;
};

export function SpellLevelSelectorSmall(props: spellLevelSelectorType) {
  const { spellFiltering, setSpellFiltering } = useContext(SpellFilterContext) as {
    spellFiltering: StateObject;
    setSpellFiltering: Function;
  };

  function spellLevelSelectHandler(value: string | null) {
    setSpellFiltering({ type: 'setSelectedLevel', value: value });
    window.scrollTo(0, 0);
  }

  return (
    <Select
      value={spellFiltering.selectedLevel}
      defaultValue="All"
      onChange={spellLevelSelectHandler}
      classNames={classes}
      radius="md"
      size="sm"
      color="#364fc7"
      hiddenFrom={props.hiddenFrom}
      data={Object.keys(spellLevel).map(function (key) {
        return spellLevel[key];
      })}
    />
  );
}
