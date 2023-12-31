'use client';

import { Badge, Group, Paper, Text, Title, Box } from '@mantine/core';
import classes from './SpellCard.module.css';
import { Spell, SpellTime, target, timeUnit, rangeUnit } from '@/shared/lib/spell';
import { MouseEventHandler } from 'react';

type SpellCardProps = {
  spell: Spell;
  onClick: Function;
};

export function SpellCard(props: SpellCardProps) {
  var spell: Spell = props.spell;
  var castTime: SpellTime | undefined = spell.castTime as SpellTime | undefined;
  var castingTime = castTime instanceof SpellTime ? castTime.toStringShort() : null;

  return (
    <Paper
      withBorder
      shadow="sm"
      radius="md"
      p="sm"
      className="spellCard"
      classNames={classes}
      onClick={() => {
        props.onClick(spell);
      }}
    >
      <Group>
        <Title order={6}>{spell.name}</Title>
        {/* Look into Mantine.Collapsed for hiding and displaying the long description.  */}
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
