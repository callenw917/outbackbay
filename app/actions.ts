'use server';

import { auth } from '@/auth';
import { Character } from '@/shared/lib/Character';

export type createCharacterProps = {
  name: string;
  level: number;
  classType: string;
  userId?: string;
};

export async function createCharacter(props: createCharacterProps) {
  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    throw new Error('User not authenticated');
  }

  props.userId = user.user.id;

  const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/create-character', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  });

  if (!response.ok) {
    throw new Error('Failed to create character');
  }

  const character = await response.json();
  return character;
}
