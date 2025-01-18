import { Spell } from '@/shared/lib/Spell';
import { Modal, Button } from '@mantine/core';

type detailedViewType = {
  spell?: Spell;
  opened: boolean;
  close: Function;
};

export function SpellCardModal({ spell, opened, close }: detailedViewType) {
  //Search for and split 'At higher levels'
  var description = spell?.description;
  var higherLevelDesc;
  var higherLevelIndex = description?.indexOf('At Higher Levels');
  if (higherLevelIndex) {
    higherLevelDesc = description?.substring(higherLevelIndex);
    description = description?.substring(0, higherLevelIndex);
  }

  return (
    <Modal
      size="lg"
      opened={opened}
      onClose={() => {
        close();
      }}
      title={spell?.name}
      centered
    >
      <p>
        <em>{spell?.level.toString()}</em>
      </p>
      <p>
        <strong>Casting Time:</strong> {spell?.castTime?.toStringLong()}
      </p>
      <p>
        <strong>Range:</strong> {spell?.range?.toString()}
      </p>
      <p>
        <strong>Components:</strong> {spell?.getComponents()}
      </p>
      <p>
        <strong>Duration:</strong> {spell?.duration?.toString()}
      </p>
      <p>{description}</p>
      <p>{higherLevelDesc}</p>
    </Modal>
  );
}
