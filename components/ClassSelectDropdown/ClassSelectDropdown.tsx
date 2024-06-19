'use client';

import { playerClass } from '@/shared/lib/spell';
import { Select } from '@mantine/core';
import { useContext } from 'react';
import classes from './ClassSelectDropdown.module.css';
import { SpellFilterContext } from '@/app/spells/state-provider';

export function ClassSelectDropdown() {
  const {spellFiltering, setSpellFiltering} = useContext(SpellFilterContext) as {spellFiltering: any, setSpellFiltering: Function};

  function onClassChange(chosenClass: string | null) {
    if (chosenClass) {
      setSpellFiltering({type: 'setSelectedClass', value: chosenClass});
    }
  }

  return (
    <Select
      placeholder="Pick value"
      data={Object.keys(playerClass).map(function (key) {
        return playerClass[key];
      })}
      defaultValue="Wizard"
      value={spellFiltering.selectedClass}
      onChange={onClassChange}
      classNames={classes}
      radius="md"
    />
  );
}
