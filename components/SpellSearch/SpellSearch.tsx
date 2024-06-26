'use client';

import { TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useContext, useEffect, useRef } from 'react';
import classes from './SpellSearch.module.css';
import { SpellSearchStateObject, spellSearchContext } from '@/app/spells/state-provider';

export default function SpellSearch() {
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const { spellSearch, setSpellSearch } = useContext(spellSearchContext) as {
    spellSearch: SpellSearchStateObject;
    setSpellSearch: Function;
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault();
        autocompleteRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <TextInput
      ref={autocompleteRef}
      className={classes.search}
      placeholder="Search"
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      visibleFrom="xs"
      onChange={(event) =>
        setSpellSearch({ type: 'setSearchTerm', value: event.currentTarget.value })
      }
    />
  );
}
