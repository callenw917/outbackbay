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
  var castingTime = castTime instanceof SpellTime ? castTime.toString() : null;

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
      
      <Group gap='xs' wrap='nowrap'>
        <Title order={6} className='smallCardh1'>{spell.name}</Title>
        <Text c='gray.6' size='xs' truncate='end' className='smallCardh2'>{spell.range?.toString()}  •  {spell.getComponentsShort()}  •  {spell.duration?.toStringShort()} </Text>
      </Group>
      <Group gap="xs" className='smallCardTags'>
        {castingTime && (
          <Badge className={classes.badge} size="sm" color={castTime?.color()}>
            {castingTime}
          </Badge>
        )}
        {spell.requiresConc && (
          <Badge className={classes.badge} size="sm" color="yellow">
            Conc
          </Badge>
        )}
        {spell.isRitual && (
          <Badge className={classes.badge} size="sm" color="indigo">
            Ritual
          </Badge>
        )}
      </Group>
      <Box
        bg={castTime?.color()}
        pos={'absolute'}
        left={'-12px'}
        w={'calc(100% + 24px)'}
        h={'6px'}
        bottom={'0px'}
      ></Box>
    </Paper>
  );
}
