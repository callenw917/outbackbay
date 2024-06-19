import { signOut } from '@/auth';

export type signInProps = {};

export function SignOut(props: signInProps) {
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
