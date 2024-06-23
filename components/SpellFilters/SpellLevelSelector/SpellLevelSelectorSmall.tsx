'use client';

import { Select } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { spellLevelEnum, supportedSpellLevels } from '@/shared/lib/spell';
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
      label="Level"
      defaultValue={supportedSpellLevels.get(spellLevelEnum.all)?.toString()}
      onChange={spellLevelSelectHandler}
      classNames={classes}
      radius="md"
      size="sm"
      color="#364fc7"
      hiddenFrom={props.hiddenFrom}
      data={Array.from(supportedSpellLevels.values()).map(function (level) {
        return level.toString();
      })}
    />
  );
}
