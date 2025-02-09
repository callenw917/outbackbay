import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';

export function withAdminAuth<T extends object>(WrappedComponent: ComponentType<T>) {
  return function WithAdminAuth(props: T) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return;

      if (!session?.user.isAdmin) {
        router.replace('/unauthorized');
      }
    }, [session, status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (!session?.user.isAdmin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
