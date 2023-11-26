'use client'

import { Group, SegmentedControl } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { useState } from 'react';
import { spellLevel } from '@/shared/lib/spell';

type spellLevelSelectorType = {
  onClick: Function
};

export function SpellLevelSelector(props: spellLevelSelectorType) {
    const [value, setValue] = useState(spellLevel.all);

    function spellLevelSelectHandler(value: string) {
      setValue(value);
      props.onClick(value);
    };

    return (
    <Group justify='center'>
        <SegmentedControl
        value={value}
        defaultValue='All'
        onChange={spellLevelSelectHandler}
        classNames={classes}
        radius="md"
        mt={20}
        size="md"
        color='blue'
        data={Object.keys(spellLevel).map(function(key){ return spellLevel[key]; })}
        />
    </Group>
  );
}