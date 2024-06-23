import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();

  const newCharacter = await prisma.character.create({
    data: {
      name: body.name,
      level: body.level,
      class: body.classType,
      user: {
        connect: {
          id: body.userId,
        },
      },
    },
  });

  return Response.json(newCharacter, {
    status: 200,
  });
}
