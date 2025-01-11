import { Spell, playerClass, SpellTime, timeUnit } from '@/shared/lib/Spell';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  var rawSpells = await prisma.spell.findMany({});

  return Response.json(rawSpells, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin':
        'https://www.outbackbay.com, https://outbackbay.com, http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400',
    },
  });
}
