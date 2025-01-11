import prisma from '@/lib/prisma';

type CharacterSelectorProps = {
  characterId: string;
};

export async function GET(request: Request, { params }: { params: { characterId: string } }) {
  if (!params.characterId) {
    return Response.json(
      { error: 'No characterId provided' + params.characterId },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin':
            'https://www.outbackbay.com, https://outbackbay.com, http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
          'Access-Control-Max-Age': '86400',
        },
      }
    );
  }
  const characterWithSpells = await prisma.character.findUnique({
    where: { id: parseInt(params.characterId, 10) },
    include: {
      spells: {
        include: {
          spell: true,
        },
      },
    },
  });

  return Response.json(characterWithSpells, {
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
