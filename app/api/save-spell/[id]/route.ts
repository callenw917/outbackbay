import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import {
  Spell,
  SpellTime,
  SpellRange,
  timeUnit,
  rangeUnit,
  spellTimeMap,
  rangeUnitMap,
} from '@/shared/lib/Spell';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const spellId = parseInt(params.id);
    const spellData = (await request.json()) as Spell;

    // Convert from Spell class format to Prisma schema format
    const updatedSpell = await prisma.spell.update({
      where: { id: spellId },
      data: {
        name: spellData.name,
        level: spellData.level.level,
        school: spellData.school || '',
        casting_time_amount: spellData.castTime?.amount || 1,
        casting_time_unit: spellData.castTime?.toString() || 'Action',
        duration_amount: spellData.duration?.amount || 0,
        duration_unit: spellData.duration?.toString() || 'Instantaneous',
        range_amount: spellData.range?.amount || 0,
        range_unit: spellData.range?.toString() || 'Self',
        ritual: spellData.isRitual || false,
        concentration: spellData.requiresConc || false,
        verbal: spellData.verbal,
        somatic: spellData.somatic,
        material: spellData.material,
        material_object: spellData.material_cost || '',
        details: spellData.description,
        // Preserve existing class access unless explicitly changed
        artificer: spellData.classes.includes('Artificer'),
        bard: spellData.classes.includes('Bard'),
        cleric: spellData.classes.includes('Cleric'),
        druid: spellData.classes.includes('Druid'),
        paladin: spellData.classes.includes('Paladin'),
        ranger: spellData.classes.includes('Ranger'),
        sorcerer: spellData.classes.includes('Sorcerer'),
        warlock: spellData.classes.includes('Warlock'),
        wizard: spellData.classes.includes('Wizard'),
      },
    });

    // Convert back to Spell class format for response
    const responseSpell = new Spell(
      updatedSpell.id.toString(),
      updatedSpell.name,
      updatedSpell.details,
      updatedSpell.level,
      [
        ...(updatedSpell.artificer ? ['Artificer'] : []),
        ...(updatedSpell.bard ? ['Bard'] : []),
        ...(updatedSpell.cleric ? ['Cleric'] : []),
        ...(updatedSpell.druid ? ['Druid'] : []),
        ...(updatedSpell.paladin ? ['Paladin'] : []),
        ...(updatedSpell.ranger ? ['Ranger'] : []),
        ...(updatedSpell.sorcerer ? ['Sorcerer'] : []),
        ...(updatedSpell.warlock ? ['Warlock'] : []),
        ...(updatedSpell.wizard ? ['Wizard'] : []),
      ],
      updatedSpell.verbal,
      updatedSpell.somatic,
      updatedSpell.material,
      updatedSpell.material_object,
      updatedSpell.school,
      undefined, // target
      new SpellTime(updatedSpell.casting_time_amount, getTimeUnit(updatedSpell.casting_time_unit)),
      updatedSpell.ritual,
      updatedSpell.concentration,
      updatedSpell.source,
      new SpellRange(updatedSpell.range_amount, getRangeUnit(updatedSpell.range_unit)),
      new SpellTime(updatedSpell.duration_amount, getTimeUnit(updatedSpell.duration_unit))
    );

    return NextResponse.json(responseSpell);
  } catch (error) {
    console.error('Error updating spell:', error);
    return NextResponse.json({ error: 'Failed to update spell' }, { status: 500 });
  }
}

// Helper functions to convert between string and enum values
function getTimeUnit(unitString: string): timeUnit {
  const unit = Array.from(spellTimeMap.entries()).find(([key]) => key === unitString);
  return unit ? unit[1] : timeUnit.action;
}

function getRangeUnit(unitString: string): rangeUnit {
  const unit = Array.from(rangeUnitMap.entries()).find(([key]) => key === unitString);
  return unit ? unit[1] : rangeUnit.self;
}
