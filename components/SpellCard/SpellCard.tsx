'use client';

import { Badge, Group, Paper, Text, Title } from '@mantine/core';
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
  console.log('Type and value of spell.castTime:', typeof spell.castTime, spell.castTime);
  console.log('Type and value of castTime:', typeof castTime, castTime);

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
        {castingTime && (
          <Badge className={classes.badge} size="sm">
            {castingTime}
          </Badge>
        )}
      </Group>
    </Paper>
  );
}
