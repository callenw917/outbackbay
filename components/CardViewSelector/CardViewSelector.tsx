import { Select } from '@mantine/core';
import classes from './CardViewSelector.module.css';
import { cardViews } from '@/shared/lib/spell';

type cardViewSelectorProps = {
  onClick: Function;
  selectedView: string;
};

export function CardViewSelector(props: cardViewSelectorProps) {
  function onViewChange(chosenView: string | null) {
    if (chosenView) {
      props.onClick(chosenView);
    }
  }

  return (
    <Select
      data={Object.keys(cardViews).map(function (key) {
        return cardViews[key];
      })}
      defaultValue={cardViews.smallCard}
      value={props.selectedView}
      onChange={onViewChange}
      classNames={classes}
      radius="md"
    />
  );
}