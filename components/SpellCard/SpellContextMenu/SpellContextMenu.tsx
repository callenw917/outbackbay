import { Button, Menu, Tooltip, rem } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

export default function SpellContextMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Menu onOpen={() => setIsMenuOpen(true)} onClose={() => setIsMenuOpen(false)}>
      <Tooltip label="Add to a Spell List" color="green" withArrow>
        <Menu.Target>
          <Button
            className="spellContextButton"
            style={{ display: isMenuOpen ? 'block' : '' }}
            size="xs"
            radius="xl"
            variant="outline"
            color="green"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <IconPlus className="spellContextButtonIcon"></IconPlus>
          </Button>
        </Menu.Target>
      </Tooltip>

      <Menu.Dropdown miw={rem(200)}>
        <Menu.Item
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Boy
        </Menu.Item>
        <Menu.Item
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Pyr-Kana
        </Menu.Item>
        <Menu.Item
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Jhegles
        </Menu.Item>

        {/* Other items ... */}
      </Menu.Dropdown>
    </Menu>
  );
}
