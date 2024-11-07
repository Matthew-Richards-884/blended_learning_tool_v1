import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { useAppSession } from '../../../util/session';

const logoutFn = createServerFn('POST', async () => {
  const session = await useAppSession();

  session.clear();

  throw redirect({
    to: '/',
  });
});

export const Route = createFileRoute('/_navbar/logout/')({
  preload: false,
  loader: () => logoutFn(),
});
