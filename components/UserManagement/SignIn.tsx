'use server';

import { signIn } from '@/auth';
import { Button } from '@mantine/core';

export type signInProps = {};

export async function SignIn(props: signInProps) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/spells' });
      }}
    >
      <Button color="blue" radius="md" type="submit" m="xs">
        Sign In
      </Button>
    </form>
  );
}
