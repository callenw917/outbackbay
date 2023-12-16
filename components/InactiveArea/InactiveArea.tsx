import { MouseEventHandler } from 'react';
import classes from './InactiveArea.module.css';

type inactiveAreaProps = {
  onClick: MouseEventHandler;
};

export function InactiveArea(props: inactiveAreaProps) {
  return <div className={classes.backgroundDiv} onClick={props.onClick}></div>;
}
