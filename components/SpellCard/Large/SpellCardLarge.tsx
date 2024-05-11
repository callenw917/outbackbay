'use client';

import { Badge, Group, Paper, Title, Box, Center } from '@mantine/core';
import classes from './SpellCardLarge.module.css';
import { Spell, SpellTime } from '@/shared/lib/spell';

type SpellCardProps = {
  spell: Spell;
  onClick: Function;
};

export function SpellCardLarge(props: SpellCardProps) {
  var spell: Spell = props.spell;
  var castTime: SpellTime | undefined = spell.castTime as SpellTime | undefined;
  var castingTime = castTime instanceof SpellTime ? castTime.toStringShort() : null;

  return (
    <Paper
      withBorder
      shadow="sm"
      radius="md"
      p="sm"
      className="spellCardLarge"
      classNames={classes}
      onClick={() => {
        props.onClick(spell);
      }}
    >
      <Center>
        <Title order={4} >{spell.name}</Title>
        <Group gap="xs">
          {/* {spell.requiresConc && (
            <Badge className={classes.badge} size="sm" color="yellow">
              CONC
            </Badge>
          )}
          {spell.isRitual && (
            <Badge className={classes.badge} size="sm" color="indigo">
              RIT
            </Badge>
          )}
          {castingTime && (
            <Badge className={classes.badge} size="sm" color={castTime?.color()}>
              {castingTime}
            </Badge>
          )} */}
        </Group>
      </Center>
      <Box
        bg={castTime?.color()}
        pos={'absolute'}
        left={'-12px'}
        w={'calc(100% + 24px)'}
        h={'6px'}
        top={'0px'}
      ></Box>
    </Paper>
  );
}
