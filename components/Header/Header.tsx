import { Group } from '@mantine/core';
import React from 'react';
import classes from './Header.module.css';
import { SignIn } from '../UserManagement/SignIn';
import { SignOut } from '../UserManagement/SignOut';
import UserMenu from '../UserManagement/UserMenu';
import { auth } from '@/auth';
import CharacterSelector from '../Characters/CharacterSelector/CharacterSelector';
import SpellSearch from '../SpellSearch/SpellSearch';

export default async function Header() {
  const session = await auth();

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group></Group>
        <SpellSearch></SpellSearch>
        <Group gap={5} className={classes.links} visibleFrom="sm">
          {session?.user && <CharacterSelector userId={session?.user?.id}></CharacterSelector>}
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
