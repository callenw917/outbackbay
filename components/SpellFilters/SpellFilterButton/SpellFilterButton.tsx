import { Chip, Tooltip } from '@mantine/core';
import { IconBrain } from '@tabler/icons-react';
import styles from './SpellFilterButton.module.css';

type SpellFilterButtonProps = {
  children: React.ReactNode;
  value: string;
  tooltip: string;
  color: string;
  variant: string;
  spellFilteringType: string;
  setSpellFiltering: Function;
};

export default function SpellFilterButton({
  children,
  value,
  tooltip,
  color,
  variant,
  spellFilteringType,
  setSpellFiltering,
}: SpellFilterButtonProps) {
  function stateChangedHandler(value: boolean) {
    setSpellFiltering({ type: spellFilteringType, value: value });
  }

  return (
    <Tooltip label={tooltip} refProp="rootRef">
      <Chip
        icon={<IconBrain />}
        value={value}
        color={color}
        variant={variant}
        classNames={styles}
        onChange={stateChangedHandler}
      >
        {children}
      </Chip>
    </Tooltip>
  );
}
