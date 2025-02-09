import prisma from '@/lib/prisma';
import { Spell } from '@/shared/lib/Spell';

/**
 * Returns all spells given a character's id
 * @param characterId
 * @returns {Promise<CharacterSpell[]>} Spells for the character
 */
export async function getSpellsForCharacter(characterId: number) {
  const characterWithSpells = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      spells: {
        include: {
          spell: true,
        },
      },
    },
  });

  if (!characterWithSpells) {
    throw new Error(`Character with id ${characterId} not found`);
  }

  const plainCharacterWithSpells = JSON.parse(JSON.stringify(characterWithSpells));

  return plainCharacterWithSpells.spells;
}

/**
 * Returns all spells for a given level
 * @param level
 * @returns {Promise<Spell[]>} Spells for the level
 */
export async function getSpellsForLevel(level: number) {
  const spells = await prisma.spell.findMany({
    where: {
      level: level,
    },
  });

  return spells;
}

/**
 * Returns all spells for a given class
 * @param classType
 * @returns {Promise<Spell[]>} Spells for the class
 */
export async function getSpellsForClassAndLevel(classType: string, level: number) {
  const spells = await prisma.spell.findMany({
    where: {
      [classType]: true,
      level: level,
    },
  });

  return spells;
}

/**
 * Updates the spell list for a character
 * @param characterId
 * @param spellIds
 * @returns {Promise<void>}
 */
export async function updateSpellList(characterId: number, spellIds: number[]) {
  const spells = await prisma.spell.findMany({
    where: {
      id: {
        in: spellIds,
      },
    },
  });

  if (spells.length !== spellIds.length) {
    throw new Error('Invalid spell id provided');
  }

  await prisma.characterSpells.deleteMany({
    where: {
      characterId: characterId,
    },
  });

  const spellData = spells.map((spell) => {
    return {
      characterId: characterId,
      spellId: spell.id,
      prepared: true,
    };
  });

  await prisma.characterSpells.createMany({
    data: spellData,
  });
}

/**
 * Saves a spell with a given id.
 * @param updatedSpell - The spell to update
 * @returns {Promise<void>}
 */
export async function handleSpellSave(updatedSpell: Spell) {
  try {
    const response = await fetch(`/api/save-spell/${updatedSpell.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSpell),
    });

    if (!response.ok) {
      throw new Error('Failed to update spell');
    }

    // Handle successful update
  } catch (error) {
    console.error('Error updating spell:', error);
    // Handle error
  }
}
