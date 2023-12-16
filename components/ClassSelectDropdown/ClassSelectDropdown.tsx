import { playerClass } from '@/shared/lib/spell';
import { Select } from '@mantine/core';
import { useState } from 'react';
import classes from './ClassSelectDropdown.module.css';

type classSelectDropdownProps = {
  onClick: Function;
  selectedClass: string;
};

export function ClassSelectDropdown(props: classSelectDropdownProps) {
  function onClassChange(chosenClass: string | null) {
    if (chosenClass) {
      props.onClick(chosenClass);
    }
  }

  return (
    <Select
      placeholder="Pick value"
      data={Object.keys(playerClass).map(function (key) {
        return playerClass[key];
      })}
      defaultValue="Wizard"
      value={props.selectedClass}
      onChange={onClassChange}
      classNames={classes}
      radius="xl"
    />
  );
}
