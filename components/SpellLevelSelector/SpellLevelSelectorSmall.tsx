import { Select } from '@mantine/core';
import classes from './SpellLevelSelector.module.css';
import { spellLevel } from '@/shared/lib/spell';

type spellLevelSelectorType = {
  onClick: Function;
  selectedLevel: string;
  hiddenFrom: string;
};

export function SpellLevelSelectorSmall(props: spellLevelSelectorType) {
  function spellLevelSelectHandler(value: string | null) {
    props.onClick(value);
  }

  return (
      <Select
        value={props.selectedLevel}
        defaultValue="All"
        onChange={spellLevelSelectHandler}
        classNames={classes}
        radius="md"
        size="md"
        color="#364fc7"
        hiddenFrom={props.hiddenFrom}
        data={Object.keys(spellLevel).map(function (key) {
          return spellLevel[key];
        })}
      />
  );
}