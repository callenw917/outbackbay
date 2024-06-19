'use client';

import { ActionIcon, CloseIcon, Group, Stack } from '@mantine/core';
import classes from './SpellFilterTray.module.css';
import { IconAdjustmentsHorizontal, IconFilters } from '@tabler/icons-react';
import { useState } from 'react';
import { ClassSelectDropdown } from '../ClassSelectDropdown/ClassSelectDropdown';
import { SpellLevelSelectorSmall } from '../SpellLevelSelector/SpellLevelSelectorSmall';
import { CardViewSelector } from '../CardViewSelector/CardViewSelector';

export default function SpellFilterTray() {
  const [isOpen, setIsOpen] = useState(true);

  // if the tray is closed, render the button
  if (!isOpen) {
    return (
      <ActionIcon
        className={classes.filterButton}
        w={'80px'}
        h={'50px'}
        radius="lg"
        onClick={() => setIsOpen(true)}
      >
        <IconFilters size={32} className={classes.icon} />
      </ActionIcon>
    );
  }

  // if the tray is open, render the tray
  return (
    <>
      <div className={classes.tray}>
        <Group justify="space-between" align="center">
          <h2>Filters</h2>
          <ActionIcon>
            <CloseIcon onClick={() => setIsOpen(false)} />
          </ActionIcon>
        </Group>
        <Stack>
          <ClassSelectDropdown />
          {/* <SpellLevelSelector visibleFrom="sm" /> */}
          {/* <SpellLevelSelectorSmall hiddenFrom="sm" /> */}
          <SpellLevelSelectorSmall hiddenFrom="" />
          <CardViewSelector />
        </Stack>
      </div>
      <div className={classes.trayFiller}></div>
    </>
  );
}
