import { playerClass } from '@/shared/lib/spell';
import { Select } from '@mantine/core';
import { useState } from 'react';

type classSelectDropdownProps = {
    onClick: Function,
    selectedClass: string
}

export function ClassSelectDropdown(props: classSelectDropdownProps) {
    
    function onClassChange(chosenClass: string | null) {
        if (chosenClass)
        {
            props.onClick(chosenClass);
        }
    }
    
    return (
        <Select
            label="Class"
            placeholder="Pick value"
            data={Object.keys(playerClass).map(function(key){ return playerClass[key]; })}
            defaultValue='All'
            value={props.selectedClass}
            onChange={onClassChange}
        />
    );
}