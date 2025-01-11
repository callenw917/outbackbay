import { Divider, Title } from '@mantine/core';
import styles from './SpellGroupWide.module.css';

type SpellGroupWideProps = {
  children: React.ReactNode;
  spellLevel: string;
};

export function SpellGroupWide(props: SpellGroupWideProps) {
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
