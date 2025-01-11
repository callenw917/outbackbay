import { Divider, Title } from '@mantine/core';
import styles from './SpellGroupNarrow.module.css';

type SpellGroupNarrowProps = {
  children: React.ReactNode;
  spellLevel: string;
};

export function SpellGroupNarrow(props: SpellGroupNarrowProps) {
  return (
    <div className={styles.spellGroup}>
      <Title order={2} className={styles.title}>
        {props.spellLevel}
      </Title>
      <Divider className={styles.title} variant="dashed" />
      {props.children}
    </div>
  );
}
