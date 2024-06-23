'use server';

import { signOut } from '@/auth';

export type signInProps = {};

export async function SignOut(props: signInProps) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/spells' });
      }}
    >
      <button type="submit">Signout</button>
    </form>
  );
}
