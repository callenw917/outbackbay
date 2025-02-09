// SpellCardModal.tsx
import {
  Spell,
  SpellTime,
  SpellRange,
  timeUnit,
  rangeUnit,
  spellTimeMap,
} from '@/shared/lib/Spell';
import { Modal, Button, TextInput, Textarea, Group, Switch } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

type detailedViewType = {
  spell?: Spell;
  opened: boolean;
  close: Function;
  onSave?: (updatedSpell: Spell) => Promise<void>;
};

export function SpellCardModal({ spell, opened, close, onSave }: detailedViewType) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentSpell, setCurrentSpell] = useState<Spell | undefined>(undefined);

  // Update state when a new spell is loaded or when the modal opens/closes
  useEffect(() => {
    if (spell) {
      setCurrentSpell(Spell.cloneSpell(spell));
    } else {
      setCurrentSpell(undefined);
    }
    setIsEditing(false);
  }, [spell, opened]);

  //Search for and split 'At higher levels'
  var description = currentSpell?.description;
  var higherLevelDesc = '';
  var higherLevelIndex = description?.indexOf('At Higher Levels');
  if (higherLevelIndex && higherLevelIndex !== -1) {
    higherLevelDesc = description?.substring(higherLevelIndex) || '';
    description = description?.substring(0, higherLevelIndex);
  }

  const handleSave = async () => {
    if (currentSpell && onSave) {
      setIsSaving(true);
      try {
        console.log('Saving spell:', currentSpell);
        await onSave(currentSpell);
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving spell:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCancel = () => {
    if (spell) {
      setCurrentSpell(Spell.cloneSpell(spell));
    }
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    setIsSaving(false);
    close();
  };

  const updateSpell = (field: keyof Spell, value: any) => {
    if (!currentSpell) return;

    const newSpell = Spell.cloneSpell(currentSpell);

    switch (field) {
      case 'level':
        newSpell.level = { level: parseInt(value), name: value === '0' ? 'Cantrip' : value };
        break;
      case 'castTime':
        newSpell.castTime = new SpellTime(1, spellTimeMap.get(value) || timeUnit.action);
        break;
      case 'range':
        newSpell.range = new SpellRange(parseInt(value) || 0, rangeUnit.feet);
        break;
      default:
        (newSpell as any)[field] = value;
    }

    setCurrentSpell(newSpell);
  };

  return (
    <Modal
      size="lg"
      opened={opened}
      onClose={handleClose}
      title={
        isEditing ? (
          <TextInput
            value={currentSpell?.name || ''}
            onChange={(e) => updateSpell('name', e.target.value)}
            placeholder="Spell Name"
          />
        ) : (
          currentSpell?.name
        )
      }
      centered
    >
      {isEditing ? (
        // Edit Mode
        <div className="space-y-4">
          <TextInput
            label="Level"
            value={currentSpell?.level.level.toString() || ''}
            onChange={(e) => updateSpell('level', e.target.value)}
          />

          <TextInput
            label="Casting Time"
            value={currentSpell?.castTime?.toString() || ''}
            onChange={(e) => updateSpell('castTime', e.target.value)}
          />

          <TextInput
            label="Range"
            value={currentSpell?.range?.amount.toString() || ''}
            onChange={(e) => updateSpell('range', e.target.value)}
          />

          <div className="space-y-2">
            <p className="font-medium">Components</p>
            <Group>
              <Switch
                label="Verbal"
                checked={currentSpell?.verbal}
                onChange={(e) => updateSpell('verbal', e.currentTarget.checked)}
              />
              <Switch
                label="Somatic"
                checked={currentSpell?.somatic}
                onChange={(e) => updateSpell('somatic', e.currentTarget.checked)}
              />
              <Switch
                label="Material"
                checked={currentSpell?.material}
                onChange={(e) => updateSpell('material', e.currentTarget.checked)}
              />
            </Group>
            {currentSpell?.material && (
              <TextInput
                label="Material Components"
                value={currentSpell?.material_cost || ''}
                onChange={(e) => updateSpell('material_cost', e.target.value)}
              />
            )}
          </div>

          <TextInput
            label="Duration"
            value={currentSpell?.duration?.toString() || ''}
            onChange={(e) => updateSpell('duration', e.target.value)}
          />

          <Textarea
            label="Description"
            value={description || ''}
            onChange={(e) => {
              const newDesc = e.target.value + (higherLevelDesc || '');
              updateSpell('description', newDesc);
            }}
            minRows={3}
          />

          {higherLevelDesc && (
            <Textarea
              label="At Higher Levels"
              value={higherLevelDesc}
              onChange={(e) => {
                const newDesc = (description || '') + 'At Higher Levels' + e.target.value;
                updateSpell('description', newDesc);
              }}
              minRows={2}
            />
          )}
        </div>
      ) : (
        // View Mode
        <>
          <p>
            <em>{currentSpell?.level.toString()}</em>
          </p>
          <p>
            <strong>Casting Time:</strong> {currentSpell?.castTime?.toStringLong()}
          </p>
          <p>
            <strong>Range:</strong> {currentSpell?.range?.toString()}
          </p>
          <p>
            <strong>Components:</strong> {currentSpell?.getComponents()}
          </p>
          <p>
            <strong>Duration:</strong> {currentSpell?.duration?.toString()}
          </p>
          <p>{description}</p>
          <p>{higherLevelDesc}</p>
        </>
      )}
      <Group justify="flex-end" mt="md">
        {session?.user?.isAdmin && !isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="light" className="mb-4">
            Edit Spell
          </Button>
        )}
        {isEditing && (
          <Group>
            <Button variant="light" color="red" onClick={handleCancel} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} loading={isSaving}>
              Save Changes
            </Button>
          </Group>
        )}
      </Group>
    </Modal>
  );
}
