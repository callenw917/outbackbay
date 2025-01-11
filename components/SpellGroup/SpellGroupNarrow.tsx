import { Divider, Title } from '@mantine/core';
import styles from './SpellGroupNarrow.module.css';
import React from 'react';

type SpellGroupNarrowProps = {
  children: React.ReactNode;
  spellLevel: string;
};

export function SpellGroupNarrow(props: SpellGroupNarrowProps) {
  const childrenArray = React.Children.toArray(props.children);
  const containerClass = childrenArray.length > 10 ? styles.spellGroupWide : styles.spellGroup;

  return (
    <div className={containerClass}>
      <Title order={2} className={styles.title}>
        {props.spellLevel}
      </Title>
      <Divider className={styles.title} variant="dashed" />
      {props.children}
    </div>
  );
}
