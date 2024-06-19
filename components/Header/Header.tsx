import { Autocomplete, Burger, Group, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import classes from './Header.module.css';
import { SignIn } from '../UserManagement/SignIn';
import { SignOut } from '../UserManagement/SignOut';
import UserMenu from '../UserManagement/UserMenu';
import { auth } from '@/auth';

export default async function Header() {
  const session = await auth();

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
          {/* <MantineLogo size={28} /> */}
        </Group>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            <Group wrap="nowrap" align="center"></Group>
            <Group>
              {!session?.user ? (
                <SignIn></SignIn>
              ) : (
                <UserMenu>
                  <SignOut></SignOut>
                </UserMenu>
              )}
            </Group>
          </Group>
        </Group>
      </div>
    </header>
  );
}
