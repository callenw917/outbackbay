import { Children } from "react";
import { SpellCard } from "../SpellCard/SpellCard";
import { Divider, Title } from "@mantine/core";

type SpellGroupProps = {
    children: React.ReactNode,
    spellLevel: string
}

export function SpellGroup(props: SpellGroupProps) {
    return (
        <div className="spellGroup">
            <Title order={2}>{props.spellLevel}</Title>
            <Divider variant="dashed"/>
            {props.children}
        </div>
    )
}