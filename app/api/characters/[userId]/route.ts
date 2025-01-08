import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  var characters = await prisma.character.findMany({
    // while testing, just return all characters
    // where: {
    //   userId: params.userId,
    // },
  });

  return Response.json(characters, {
    status: 200,
  });
}
