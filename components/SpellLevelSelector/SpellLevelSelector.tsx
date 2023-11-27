'use client'

import { Group, SegmentedControl } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { spellLevel } from '@/shared/lib/spell';

type spellLevelSelectorType = {
  onClick: Function
  selectedLevel: string
};

export function SpellLevelSelector(props: spellLevelSelectorType) {

    function spellLevelSelectHandler(value: string) { props.onClick(value); };

    return (
    <Group justify='center'>
        <SegmentedControl
        value={props.selectedLevel}
        defaultValue='All'
        onChange={spellLevelSelectHandler}
        classNames={classes}
        radius="md"
        size="md"
        color='#364fc7'
        data={Object.keys(spellLevel).map(function(key){ return spellLevel[key]; })}
        />
    </Group>
  );
}