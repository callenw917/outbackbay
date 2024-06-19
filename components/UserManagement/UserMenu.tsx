'use client';

import { Menu, rem, ActionIcon } from '@mantine/core';
import { IconUser, IconLogout } from '@tabler/icons-react';

export default function UserMenu({ children }: { children: any }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="gradient"
          m="5px"
          size="xl"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          <IconUser></IconUser>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          {children}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
