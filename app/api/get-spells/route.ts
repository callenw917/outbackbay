import { Spell } from "@/shared/lib/spell";
import prisma from "@/lib/prisma";

export async function GET(request: Request)
{
    var spells: Spell[] = [];

    var rawSpells = await prisma.spell.findMany({});

    rawSpells.forEach((rawSpell: any) => {
        spells.push(new Spell(rawSpell.name, rawSpell.details, rawSpell.level));
    });

    return Response.json(spells, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
          "Access-Control-Max-Age": "86400",
        }
    });
}