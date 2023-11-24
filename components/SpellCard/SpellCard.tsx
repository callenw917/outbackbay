'use client'

import { Badge, Paper, Text, Title } from "@mantine/core";
import classes from './SpellCard.module.css'
import { Spell, target, timeUnit, rangeUnit } from '@/shared/lib/spell';
import { MouseEventHandler } from "react";

type SpellCardProps = {
    spell: Spell,
    onClick: Function
}

export function SpellCard(props: SpellCardProps) {

    var spell:Spell = props.spell;

    return (
        <Paper withBorder shadow="sm" radius="md" p='sm' className="spellCard" classNames={classes} onClick={() => {props.onClick(spell)}}>
            <Title order={6}>{spell.name}</Title>
            {/* Look into Mantine.Collapsed for hiding and displaying the long description.  */}
        </Paper>
    )
}