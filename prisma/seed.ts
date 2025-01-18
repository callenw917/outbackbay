// NOTE: run 'npx prisma db seed' to populate data from seed.ts

var prismaImport = require('@prisma/client');
const prisma = new prismaImport.PrismaClient();

async function main() {
  var fs = require('fs');
  var csv_parse = require('csv-parse/sync');
  var path = require('path');

  console.log('Deleting existing data...');
  await prisma.characterSpells.deleteMany();
  await prisma.spell.deleteMany();
  await prisma.character.deleteMany();
  console.log('Done');

  const options = {
    columns: [
      'name',
      'level',
      'school',
      'casting_time_amount',
      'casting_time_unit',
      'duration_amount',
      'duration_unit',
      'range_amount',
      'range_unit',
      'area_type',
      'area_amount',
      'area_unit',
      'attack',
      'save',
      'damage_or_effect',
      'ritual',
      'concentration',
      'verbal',
      'somatic',
      'material',
      'material_object',
      'source',
      'details',
      'link',
      'wizard',
      'warlock',
      'sorcerer',
      'ranger',
      'paladin',
      'druid',
      'cleric',
      'bard',
      'artificer',
    ],
    delimiter: ',',
    cast: function (value: any, context: any) {
      switch (context.column) {
        case 'level':
        case 'casting_time_amount':
        case 'duration_amount':
        case 'range_amount':
        case 'area_amount':
          if (!value) {
            return null;
          }
          return Number(value);
        case 'ritual':
        case 'concentration':
        case 'verbal':
        case 'somatic':
        case 'material':
        case 'artificer':
        case 'bard':
        case 'cleric':
        case 'paladin':
        case 'ranger':
        case 'sorcerer':
        case 'druid':
        case 'warlock':
        case 'wizard':
          return Boolean(value);
      }
      return value;
    },
  };

  const csvPath = path.join(__dirname, 'spell_list.csv');
  const fileContent = fs.readFileSync(csvPath, { encoding: 'utf-8' });

  // Parse the CSV data
  console.log('Parsing the CSV data');
  const records = csv_parse.parse(fileContent, options, (error: any, result: any) => {
    if (error) {
      console.log(error);
    }
  });
  console.log('Done');

  // Create Spell Records
  console.log('Creating Spell records');
  await prisma.spell.createMany({
    data: records,
  });
  console.log('Done');

  console.log('Seeding characters...');
  const createdCharacter = await prisma.character.create({
    data: {
      name: 'Pyr-Kana',
      class: 'Wizard',
      level: 14,
    },
  });
  console.log('Done');

  console.log("Seeding characters' spells...");
  await prisma.characterSpells.createMany({
    data: [
      {
        characterId: createdCharacter.id,
        spellId: await getSpellIdByName('Fireball'),
        prepared: true,
      },
      {
        characterId: createdCharacter.id,
        spellId: await getSpellIdByName('Burning Hands'),
        prepared: true,
      },
      {
        characterId: createdCharacter.id,
        spellId: await getSpellIdByName('Flaming Sphere'),
        prepared: true,
      },
      {
        characterId: createdCharacter.id,
        spellId: await getSpellIdByName('Wall of Fire'),
        prepared: false,
      },
      {
        characterId: createdCharacter.id,
        spellId: await getSpellIdByName('Delayed Blast Fireball'),
        prepared: false,
      },
    ],
  });
  console.log('Done');
}

async function getSpellIdByName(name: string) {
  const spell = await prisma.spell.findFirst({
    where: {
      name: name,
    },
  });
  return spell.id;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
