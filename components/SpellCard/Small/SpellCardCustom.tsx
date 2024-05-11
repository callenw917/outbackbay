import { Badge, Paper, Text, Title } from '@mantine/core';
import classes from './SpellCard.module.css';

type SpellCardProps = {
  name: string;
};

export function SpellCardCustom(props: SpellCardProps) {
  return (
    <Paper withBorder shadow="sm" radius="md" p="md" className="spellCard" classNames={classes}>
      <Title order={4}>{props.name}</Title>
      <Text size="md">
        Here is a description about a spell! It could be long or it could be short. Who knows!
      </Text>
      {/* Look into Mantine.Collapsed for hiding and displaying the long description.  */}
    </Paper>
  );
}
