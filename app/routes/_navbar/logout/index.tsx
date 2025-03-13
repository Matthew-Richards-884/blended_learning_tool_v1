import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { useAppSession } from '../../../util/session';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAppSession } from '../../../components/Navbar';
import { useEffect } from 'react';

const logoutFn = createServerFn('GET', async () => {
  const session = await useAppSession();
  await session.clear();
});

export const Route = createFileRoute('/_navbar/logout/')({
  loader: () => logoutFn(),
  component: () => {
    const logoutMutation = useMutation({
      mutationFn: () => logoutFn(),
    });
    // useRouter is a hook, so must be treated as one.
    const router = useRouter();

    useEffect(() => {
      logoutMutation.mutate();
      router.invalidate();
      router.navigate({
        to: '/login',
      });
    }, []);
  },
});
