// NOTE: run 'npx prisma db seed' to populate data from seed.ts

var prismaImport = require('@prisma/client');
const prisma = new prismaImport.PrismaClient();

async function main()
{
    var fs = require('fs');
    var csv_parse = require('csv-parse/sync');
    var path = require('path');

    console.log("Deleting existing data...")
    await prisma.spell.deleteMany();
    console.log("Done");

    const options = {
        columns: ['name','level','school','casting_time','duration','range','area','attack','save','damage_or_effect','ritual','concentration','verbal','somatic','material','material_object','source','details','link'],
        delimiter: ',',
        cast: function(value: any, context: any)
        {
            if (context.column === 'level') return Number(value);
            if (context.column === 'ritual') return Boolean(value);
            if (context.column === 'concentration') return Boolean(value);
            if (context.column === 'verbal') return Boolean(value);
            if (context.column === 'somatic') return Boolean(value);
            if (context.column === 'material') return Boolean(value);
            
            return value;
        }
    };

    const csvPath = path.join(__dirname, 'spell_list.csv');
    const fileContent = fs.readFileSync(csvPath, {encoding: 'utf-8'});

    // Parse the CSV data
    const records = csv_parse.parse(fileContent, options, (error: any, result: any) => {
        //if (error) {console.log(error);}
    });

    await prisma.spell.createMany({
        data: records
    });
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1);
})