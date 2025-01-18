'use client';

import { cardViews, playerClass, spellLevelEnum, supportedSpellLevels } from '@/shared/lib/Spell';
import { createContext, useReducer } from 'react';

/***************************************************** */
/*                   Spell Filtering                   */
/***************************************************** */
export interface FilterStateObject {
  selectedClass: string;
  selectedLevel: string;
  selectedView: string;
  showActions: boolean;
  showBonusActions: boolean;
  showReactions: boolean;
  showConcentration: boolean;
  showRituals: boolean;
  showVerbal: boolean;
  showSomatic: boolean;
  showMaterial: boolean;
  showKnownSpells: boolean;
}

const initialFilterState: FilterStateObject = {
  selectedClass: playerClass.wizard,
  selectedLevel: supportedSpellLevels.get(spellLevelEnum.all)?.toString() as string,
  selectedView: cardViews.smallCard,
  showActions: false,
  showBonusActions: false,
  showReactions: false,
  showConcentration: false,
  showRituals: false,
  showVerbal: true,
  showSomatic: true,
  showMaterial: true,
  showKnownSpells: false,
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
    case 'setShowActions':
      return {
        ...state,
        showActions: action.value,
      };
    case 'setShowBonusActions':
      return {
        ...state,
        showBonusActions: action.value,
      };
    case 'setShowReactions':
      return {
        ...state,
        showReactions: action.value,
      };
    case 'setShowConcentration':
      return {
        ...state,
        showConcentration: action.value,
      };
    case 'setShowRituals':
      return {
        ...state,
        showRituals: action.value,
      };
    case 'setShowVerbal':
      return {
        ...state,
        showVerbal: action.value,
      };
    case 'setShowSomatic':
      return {
        ...state,
        showSomatic: action.value,
      };
    case 'setShowMaterial':
      return {
        ...state,
        showMaterial: action.value,
      };
    case 'setShowKnownSpells':
      return {
        ...state,
        showKnownSpells: action.value,
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
