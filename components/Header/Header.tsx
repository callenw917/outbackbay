import { ActionIcon, Autocomplete, Burger, Group, rem } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import React from 'react';
import classes from './Header.module.css';
import { SignIn } from '../UserManagement/SignIn';
import { SignOut } from '../UserManagement/SignOut';
import UserMenu from '../UserManagement/UserMenu';
import { auth } from '@/auth';
import CharacterSelector from '../Characters/CharacterSelector/CharacterSelector';
import { Character } from '@/shared/lib/character';

export default async function Header() {
  const session = await auth();
  var characters = [];
  if (session?.user?.id) {
    characters = await getCharactersForUser(session?.user?.id);
  }

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group></Group>
        <Autocomplete
          className={classes.search}
          placeholder="Search"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          visibleFrom="xs"
        />
        <Group gap={5} className={classes.links} visibleFrom="sm">
          <CharacterSelector userId={session?.user?.id}></CharacterSelector>
          {!session?.user ? (
            <SignIn></SignIn>
          ) : (
            <UserMenu>
              <SignOut></SignOut>
            </UserMenu>
          )}
        </Group>
      </div>
    </header>
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
