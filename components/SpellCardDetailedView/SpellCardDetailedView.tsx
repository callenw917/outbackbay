import { Spell } from '@/shared/lib/spell';
import { Modal, Button } from '@mantine/core';

type detailedViewType = {
  spell: Spell;
  opened: boolean;
  close: Function;
};

export function SpellCardDetailedView(props: detailedViewType) {
  //Search for and split 'At higher levels'
  var description = props.spell?.description;
  var higherLevelDesc;
  var higherLevelIndex = description?.indexOf('At Higher Levels');
  if (higherLevelIndex) {
    higherLevelDesc = description?.substring(higherLevelIndex);
    description = description.substring(0, higherLevelIndex);
  }

  return (
    <Modal
      size="lg"
      opened={props.opened}
      onClose={() => {
        props.close();
      }}
      title={props.spell?.name}
      centered
    >
      <p>{description}</p>
      <p>{higherLevelDesc}</p>
    </Modal>
  );
}
