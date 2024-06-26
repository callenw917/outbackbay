'use client';

import { cardViews, playerClass, spellLevelEnum, supportedSpellLevels } from '@/shared/lib/spell';
import { createContext, useReducer } from 'react';

/***************************************************** */
/*                   Spell Filtering                   */
/***************************************************** */
export interface FilterStateObject {
  selectedClass: string;
  selectedLevel: string;
  selectedView: string;
}

const initialFilterState: FilterStateObject = {
  selectedClass: playerClass.wizard,
  selectedLevel: supportedSpellLevels.get(spellLevelEnum.all)?.toString() as string,
  selectedView: cardViews.smallCard,
};

export const SpellFilterContext = createContext({
  spellFiltering: initialFilterState,
  setSpellFiltering: (value: any) => {},
});

function spellFilterReducer(state: FilterStateObject, action: any): FilterStateObject {
  switch (action.type) {
    case 'setSelectedClass':
      return {
        ...state,
        selectedClass: action.value,
      };
    case 'setSelectedLevel':
      return {
        ...state,
        selectedLevel: action.value,
      };
    case 'setSelectedView':
      return {
        ...state,
        selectedView: action.value,
      };
    default:
      return state;
  }
}

/***************************************************** */
/*                  Spell Searching                    */
/***************************************************** */
export interface SpellSearchStateObject {
  searchTerm: string;
}

const initialSearchState: SpellSearchStateObject = {
  searchTerm: '',
};

export const spellSearchContext = createContext({
  spellSearch: initialSearchState,
  setSpellSearch: (value: any) => {},
});

function spellSearchReducer(state: SpellSearchStateObject, action: any): SpellSearchStateObject {
  switch (action.type) {
    case 'setSearchTerm':
      return {
        ...state,
        searchTerm: action.value,
      };
    default:
      return state;
  }
}

export default function StateProvider({ children }: { children: React.ReactNode }) {
  const [spellFiltering, setSpellFiltering] = useReducer(spellFilterReducer, initialFilterState);
  const [spellSearching, setSpellSearching] = useReducer(spellSearchReducer, initialSearchState);

  return (
    <SpellFilterContext.Provider value={{ spellFiltering, setSpellFiltering }}>
      <spellSearchContext.Provider
        value={{ spellSearch: spellSearching, setSpellSearch: setSpellSearching }}
      >
        {children}
      </spellSearchContext.Provider>
    </SpellFilterContext.Provider>
  );
}
