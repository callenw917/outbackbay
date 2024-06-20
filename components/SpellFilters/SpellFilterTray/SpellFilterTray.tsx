'use client';

import { ActionIcon, Stack } from '@mantine/core';
import classes from './SpellFilterTray.module.css';
import { IconFilters, IconSquareX } from '@tabler/icons-react';
import { useState } from 'react';
import { ClassSelectDropdown } from '../ClassSelectDropdown/ClassSelectDropdown';
import { SpellLevelSelectorSmall } from '../SpellLevelSelector/SpellLevelSelectorSmall';
import { CardViewSelector } from '../CardViewSelector/CardViewSelector';

export default function SpellFilterTray() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={isOpen ? classes.trayOpened : classes.trayClosed}>
        <h2>Filters</h2>
        <Stack>
          <ClassSelectDropdown />
          <SpellLevelSelectorSmall hiddenFrom="" />
          <CardViewSelector />
        </Stack>
      </div>
      <ActionIcon
        className={isOpen ? classes.filterButtonClose : classes.filterButtonOpen}
        variant="light"
        w={'70px'}
        h={'50px'}
        radius="lg"
        onClick={isOpen ? () => setIsOpen(false) : () => setIsOpen(true)}
      >
        {isOpen ? (
          <IconSquareX size={32} className={classes.icon} />
        ) : (
          <IconFilters size={32} className={classes.icon} />
        )}
      </ActionIcon>
      {isOpen ? (
        <div className={classes.trayFillerOpened}></div>
      ) : (
        <div className={classes.trayFillerClosed}></div>
      )}
    </>
  );
}
