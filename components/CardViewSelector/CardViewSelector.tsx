'use client';

import { Select } from '@mantine/core';
import classes from './CardViewSelector.module.css';
import { cardViews } from '@/shared/lib/spell';
import { SpellFilterContext, StateObject } from '@/app/spells/state-provider';
import { useContext } from 'react';

export function CardViewSelector() {
  const {spellFiltering, setSpellFiltering} = useContext(SpellFilterContext) as {spellFiltering: StateObject, setSpellFiltering: Function};

  function onViewChange(chosenView: string | null) {
    if (chosenView) {
      setSpellFiltering({type: 'setSelectedView', value: chosenView});
    }
  }

  return (
    <Select
      data={Object.keys(cardViews).map(function (key) {
        return cardViews[key];
      })}
      defaultValue={cardViews.smallCard}
      value={spellFiltering.selectedView}
      onChange={onViewChange}
      classNames={classes}
      radius="md"
    />
  );
}