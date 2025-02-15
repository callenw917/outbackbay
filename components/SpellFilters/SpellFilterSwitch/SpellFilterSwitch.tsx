import { Switch, Tooltip } from '@mantine/core';
import styles from './SpellFilterSwitch.module.css';

type SpellFilterSwitchProps = {
  isSelected: boolean;
  tooltip: string;
  label: string;
  spellFilteringType: string;
  setSpellFiltering: Function;
};

export default function SpellFilterSwitch({
  isSelected,
  tooltip,
  label,
  spellFilteringType,
  setSpellFiltering,
}: SpellFilterSwitchProps) {
  function stateChangedHandler(value: boolean) {
    setSpellFiltering({ type: spellFilteringType, value: value });
  }
  return (
    <Tooltip label={tooltip} refProp="rootRef">
      <Switch
        label={label}
        checked={isSelected}
        onChange={(event) => stateChangedHandler(event.currentTarget.checked)}
        classNames={styles}
      />
    </Tooltip>
  );
}
