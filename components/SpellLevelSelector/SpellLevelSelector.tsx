'use client'

import { Group, SegmentedControl } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { useState } from 'react';

export function SpellLevelSelector() {
    const [value, setValue] = useState('react');

    return (
    <Group justify='center'>
        <SegmentedControl
        value={value}
        defaultValue='All'
        onChange={setValue}
        classNames={classes}
        radius="md"
        mt={50}
        size="md"
        color='blue'
        data={['All','Cantrips', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
        />
    </Group>
  );
}