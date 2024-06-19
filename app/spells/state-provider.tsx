'use client';

import { cardViews, playerClass, spellLevel } from '@/shared/lib/spell';
import { createContext, useReducer } from 'react';

export interface StateObject {
  selectedClass: string;
  selectedLevel: string;
  selectedView: string;
}

const initialState: StateObject = {
  selectedClass: playerClass.wizard,
  selectedLevel: spellLevel.all,
  selectedView: cardViews.smallCard,
};

export const SpellFilterContext = createContext({
  spellFiltering: initialState,
  setSpellFiltering: (value: any) => {},
});

export default function StateProvider({ children }: { children: React.ReactNode }) {
  const [spellFiltering, setSpellFiltering] = useReducer(spellReducer, initialState);

  return (
    <SpellFilterContext.Provider value={{ spellFiltering, setSpellFiltering }}>
      {children}
    </SpellFilterContext.Provider>
  );
}

function spellReducer(state: StateObject, action: any): StateObject {
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
