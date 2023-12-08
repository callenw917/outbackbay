import { Spell, playerClass, SpellTime } from "@/shared/lib/spell";
import prisma from "@/lib/prisma";

export async function GET(request: Request)
{
    var spells: Spell[] = [];

    var rawSpells = await prisma.spell.findMany({});

    rawSpells.forEach((rawSpell: any) => {
        var classArray: string[] = buildClassArray(rawSpell);
        spells.push(new Spell(rawSpell.id, rawSpell.name, rawSpell.details, rawSpell.level, classArray,"",undefined,rawSpell.casting_time));
    });

    return Response.json(spells, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://www.outbackbay.com, https://outbackbay.com, http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
          "Access-Control-Max-Age": "86400",
        }
    });
}

function buildClassArray(rawSpell: any): string[]
{
  var classArray: string[] = ['All'];
  if (rawSpell.artificer) {classArray.push(playerClass.artificer)};
  if (rawSpell.bard) {classArray.push(playerClass.bard)};
  if (rawSpell.cleric) {classArray.push(playerClass.cleric)};
  if (rawSpell.druid) {classArray.push(playerClass.druid)};
  if (rawSpell.paladin) {classArray.push(playerClass.paladin)};
  if (rawSpell.ranger) {classArray.push(playerClass.ranger)};
  if (rawSpell.sorcerer) {classArray.push(playerClass.sorcerer)};
  if (rawSpell.warlock) {classArray.push(playerClass.warlock)};
  if (rawSpell.wizard) {classArray.push(playerClass.wizard)};
  return classArray;
}