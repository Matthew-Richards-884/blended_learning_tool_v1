import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { useAppSession } from '../../../util/session';

const logoutFn = createServerFn('POST', async () => {
  const session = await useAppSession();

  session.clear();
  const router = useRouter();

  await router.invalidate();
  router.navigate({
    to: '/',
  });
});

export const Route = createFileRoute('/_navbar/logout/')({
  preload: false,
  loader: () => logoutFn(),
});
