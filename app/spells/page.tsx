import { auth } from '@/auth';
import { CardViewSelector } from '@/components/CardViewSelector/CardViewSelector';
import { ClassSelectDropdown } from '@/components/ClassSelectDropdown/ClassSelectDropdown';
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';
import { SpellLevelSelectorSmall } from '@/components/SpellLevelSelector/SpellLevelSelectorSmall';
import SpellViewer from '@/components/SpellViewer/SpellViewer';
import UserAvatar from '@/components/UserAvatar';
import { SignIn } from '@/components/UserManagement/SignIn';
import { SignOut } from '@/components/UserManagement/SignOut';
import UserMenu from '@/components/UserManagement/UserMenu';
import { ActionIcon, Button, Group } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

async function getSpells() {
  var spellJson = await fetch(process.env.NEXT_PUBLIC_URL + '/api/get-spells', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return spellJson.json();
}

export default async function SpellPage() {
  const rawSpells = await getSpells();
  const session = await auth();
  return (
      <>
        <Group wrap="nowrap" align="center" className="header" justify='space-between'>
          <Group wrap="nowrap" align='center'>
            <ClassSelectDropdown/>
            <SpellLevelSelector visibleFrom="sm" />
            <SpellLevelSelectorSmall hiddenFrom="sm" />
            <CardViewSelector/>
          </Group>
          <Group>
            {!session?.user ? 
              <SignIn></SignIn> :
              <UserMenu>
                <SignOut></SignOut>
              </UserMenu>
            }
          </Group>
        </Group>
        <SpellViewer rawSpells={rawSpells}></SpellViewer>
      </>
  );
}

/*
    While on 'all' we'll default to smaller cards in a column format. The description of the spell will be collapsed but expandable.
    If clicking on a specific spell level, we'll switch to a single column view with much more detail per spell, not requiring a button to expand the description.
*/
