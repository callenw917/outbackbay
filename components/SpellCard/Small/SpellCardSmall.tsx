'use client';

import { Badge, Group, Paper, Text, Title, Box } from '@mantine/core';
import classes from './SpellCardSmall.module.css';
import { Spell, SpellTime, target, timeUnit, rangeUnit } from '@/shared/lib/spell';
import { MouseEventHandler } from 'react';

type SpellCardProps = {
  spell: Spell;
  onClick: Function;
};

export function SpellCardSmall(props: SpellCardProps) {
  var spell: Spell = props.spell;
  var castTime: SpellTime | undefined = spell.castTime as SpellTime | undefined;
  var castingTime = castTime instanceof SpellTime ? castTime.toStringShort() : null;

  return (
    <Paper
      withBorder
      shadow="sm"
      radius="md"
      p="sm"
      className="spellCardSmall"
      classNames={classes}
      onClick={() => {
        props.onClick(spell);
      }}
    >
      <Group justify="space-between">
        <Title order={6}>{spell.name}</Title>
        <Group gap="xs">
          {spell.requiresConc && (
            <Badge className={classes.badge} size="sm" color="yellow">
              C
            </Badge>
          )}
          {spell.isRitual && (
            <Badge className={classes.badge} size="sm" color="indigo">
              R
            </Badge>
          )}
          {castingTime && (
            <Badge className={classes.badge} size="sm" color={castTime?.color()}>
              {castingTime}
            </Badge>
          )}
        </Group>
      </Group>
      <Box
        bg={castTime?.color()}
        pos={'relative'}
        left={'-12px'}
        w={'calc(100% + 24px)'}
        h={'6px'}
        bottom={'-12px'}
      ></Box>
    </Paper>
  );
}
