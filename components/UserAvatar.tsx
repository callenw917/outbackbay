import React from 'react';
import { auth } from '../auth';
import { Image } from '@mantine/core';

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return <Image src={session.user.image} h={40} w={40} alt="User Avatar" />;
}
