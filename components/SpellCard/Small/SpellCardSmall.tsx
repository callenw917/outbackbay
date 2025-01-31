'use client';

import classes from './SpellCardSmall.module.css';
import { Badge, Group, Paper, Text, Title, Box } from '@mantine/core';
import { Spell, SpellTime } from '@/shared/lib/Spell';
import SpellContextMenu from '../SpellContextMenu/SpellContextMenu';

type SpellCardProps = {
  spell: Spell;
  prepared: boolean;
  onClick: Function;
};

export function SpellCardSmall(props: SpellCardProps) {
  var spell: Spell = props.spell;
  var castTime: SpellTime | undefined = spell.castTime as SpellTime | undefined;
  var castingTime = castTime instanceof SpellTime ? castTime.toString() : null;

  return (
    <Paper
      withBorder
      pos={'relative'}
      shadow={props.prepared ? 'sm' : ''}
      radius="md"
      p="sm"
      bg={props.prepared ? 'white' : 'gray.3'}
      className="spellCardSmall"
      classNames={classes}
      onClick={() => {
        props.onClick(spell);
      }}
    >
      <Group gap="xs" wrap="nowrap">
        <Title order={6} className="smallCardh1">
          {spell.name}
        </Title>
        <Text c="gray.6" size="xs" truncate="end" className="smallCardh2">
          {spell.range?.toString()} • {spell.getComponentsShort()} •{' '}
          {spell.duration?.toStringShort()}{' '}
        </Text>
      </Group>
      <Group gap="xs" className="smallCardTags">
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
      <SpellContextMenu />
    </Paper>
  );
}
