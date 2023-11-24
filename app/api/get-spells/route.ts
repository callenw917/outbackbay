import { Spell } from "@/shared/lib/spell";

export async function GET(request: Request)
{
    var spells: Spell[] = [];

    var rawSpells = await prisma.spell.findMany({});

    rawSpells.forEach((rawSpell: any) => {
        spells.push(new Spell(rawSpell.name, rawSpell.details, rawSpell.level));
    });

    return Response.json(spells);
}