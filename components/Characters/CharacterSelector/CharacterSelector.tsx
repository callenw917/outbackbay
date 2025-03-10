'use client';

import { ActionIcon, Button, Group, Modal, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createCharacter } from '@/app/actions';
import { Character } from '@/shared/lib/Character';

type CharacterSelectorProps = {
  userId: string | undefined;
};

export default function CharacterSelector({ userId }: CharacterSelectorProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const router = useRouter();
  const params = useParams();
  const activeCharacterId = Array.isArray(params?.characterId)
    ? params.characterId[0]
    : params?.characterId;

  useEffect(() => {
    if (userId) {
      getCharactersForUser(userId).then(setCharacters);
    }
  }, [userId]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      level: 1,
      classType: '',
    },
  });

  const handleAddCharacter = async (values: typeof form.values) => {
    const rawCharacter = await createCharacter({
      name: values.name,
      level: values.level,
      classType: values.classType,
    });
    const newCharacter = new Character(
      rawCharacter.id,
      rawCharacter.name,
      rawCharacter.level,
      rawCharacter.class
    );
    setCharacters([...characters, newCharacter]);
    setModalOpen(false);
  };

  const handleDeleteAllCharacters = async () => {
    const resp = await fetch(process.env.NEXT_PUBLIC_URL + '/api/delete-all-characters', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify('props'),
    });
  };

  const handleCharacterSelect = (value: string | null) => {
    if (!value) return;
    const characterId = value.split('[')[1].split(']')[0];
    if (characterId === activeCharacterId) return;
    router.push(`/spells/character/${characterId}`);
  };

  const characterNames = characters.map(
    (character: Character) => character.name + ' [' + character.id + ']'
  );

  const env = process.env.NODE_ENV;

  const selectedCharacter = characters.find((char) => char.id.toString() === activeCharacterId);
  const selectedValue = selectedCharacter
    ? `${selectedCharacter.name} [${selectedCharacter.id}]`
    : null;

  return (
    <>
      <Select
        data={characterNames}
        allowDeselect={false}
        placeholder="Select Character"
        onChange={handleCharacterSelect}
        value={selectedValue}
      />
      <ActionIcon variant="subtle" size="lg" onClick={() => setModalOpen(true)}>
        <IconPlus></IconPlus>
      </ActionIcon>
      {env == 'development' && (
        <ActionIcon variant="subtle" size="lg" onClick={handleDeleteAllCharacters}>
          <IconTrash></IconTrash>
        </ActionIcon>
      )}
      <Modal
        opened={modalOpen}
        centered
        onClose={() => setModalOpen(false)}
        title="Create Character"
      >
        <form onSubmit={form.onSubmit(handleAddCharacter)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Character Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Class"
            placeholder="Character Class"
            key={form.key('classType')}
            {...form.getInputProps('classType')}
          />
          <NumberInput
            withAsterisk
            label="Level"
            placeholder="Character Level (1-20)"
            key={form.key('level')}
            {...form.getInputProps('level')}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export async function getCharactersForUser(userId: string) {
  const rawCharacters = await fetch(process.env.NEXT_PUBLIC_URL + `/api/characters/${userId}`).then(
    (res) => res.json()
  );

  var characters = rawCharacters.map((character: any) => {
    return new Character(character.id, character.name, character.level, character.class);
  });

  return characters;
}
