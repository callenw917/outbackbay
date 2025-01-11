'use client';

import { Group, Paper, Title, Box, Center, Text, HoverCard } from '@mantine/core';
import classes from './SpellCardLarge.module.css';
import { Spell } from '@/shared/lib/Spell';

type SpellCardProps = {
  spell: Spell;
  onClick: Function;
};

export function SpellCardLarge(props: SpellCardProps) {
  var spell: Spell = props.spell;
  var spellComponents = spell.components;
  if (spellComponents) {
    spellComponents = spellComponents.replace(/[()]/g, '');
    spellComponents = spellComponents.charAt(0).toUpperCase() + spellComponents.slice(1);
  }

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
        <Title order={4}>{spell.name}</Title>
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
      <Group justify="center" c="gray.6" gap="xs">
        <Text span size="sm">
          {spell.castTime?.toString()}
        </Text>
        <Text span size="sm">
          •
        </Text>
        <Text span size="sm">
          {spell.range?.toString()}
        </Text>
        <Text span size="sm">
          •
        </Text>
        <HoverCard shadow="md">
          <HoverCard.Target>
            <Text span size="sm">
              {spell.getComponents()}
            </Text>
          </HoverCard.Target>
          {spellComponents && (
            <HoverCard.Dropdown>
              <Text>{spellComponents}</Text>
            </HoverCard.Dropdown>
          )}
        </HoverCard>
        <Text span size="sm">
          •
        </Text>
        <Text span size="sm">
          {spell.duration?.toString()}
        </Text>
      </Group>
      <Group>
        <Text size="xs" className="spellDescriptionShort">
          {spell.description}
        </Text>
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
