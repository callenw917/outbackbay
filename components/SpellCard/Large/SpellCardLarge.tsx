'use client';

import { Badge, Group, Paper, Title, Box, Center, Text } from '@mantine/core';
import classes from './SpellCardLarge.module.css';
import { Spell, SpellTime } from '@/shared/lib/spell';
import { Span } from 'next/dist/trace';

type SpellCardProps = {
  spell: Spell;
  onClick: Function;
};

export function SpellCardLarge(props: SpellCardProps) {
  var spell: Spell = props.spell;

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
      <Group justify='center' c='gray.6'>
          <Text>{spell.castTime?.toString()}  •  {spell.range?.toString()}  •  {spell.getComponents()}  •  {spell.duration?.toString()} </Text>
      </Group>
      <Group>
        <Text size='xs' className='spellDescriptionShort'>{spell.description}</Text>
      </Group>
      <Box
        bg={spell.castTime?.color()}
        pos={'absolute'}
        left={'-12px'}
        w={'calc(100% + 24px)'}
        h={'6px'}
        top={'0px'}
      ></Box>
    </Paper>
  );
}
