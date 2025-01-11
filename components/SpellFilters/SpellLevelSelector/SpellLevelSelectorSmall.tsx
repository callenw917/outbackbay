'use client';

import { Select } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { spellLevelEnum, supportedSpellLevels } from '@/shared/lib/Spell';
import { SpellFilterContext, FilterStateObject } from '@/app/spells/state-provider';
import { useContext } from 'react';

type spellLevelSelectorType = {
  hiddenFrom: string;
};

export function SpellLevelSelectorSmall(props: spellLevelSelectorType) {
  const { spellFiltering, setSpellFiltering } = useContext(SpellFilterContext) as {
    spellFiltering: FilterStateObject;
    setSpellFiltering: Function;
  };

  function spellLevelSelectHandler(value: string | null) {
    setSpellFiltering({ type: 'setSelectedLevel', value: value });
    window.scrollTo(0, 0);
  }

  return (
    <Select
      value={spellFiltering.selectedLevel}
      defaultValue={supportedSpellLevels.get(spellLevelEnum.all)?.toString()}
      onChange={spellLevelSelectHandler}
      classNames={classes}
      radius="md"
      size="sm"
      hiddenFrom={props.hiddenFrom}
      data={Array.from(supportedSpellLevels.values()).map(function (level) {
        return level.toString();
      })}
    />
  );
}
