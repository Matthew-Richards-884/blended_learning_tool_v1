import { createRootRoute } from '@tanstack/react-router';
import { Outlet, ScrollRestoration } from '@tanstack/react-router';
import { Body, createServerFn, Head, Html, Meta, Scripts } from '@tanstack/start';
import * as React from 'react';
import '../styles/main.css';
import { useAppSession } from '../util/session';
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary';
import { NotFound } from '../components/NotFound';

const fetchUser = createServerFn('GET', async () => {
  // We need to auth on the server so we have access to secure cookies
  const session = await useAppSession()

  if (!session.data.userEmail) {
    return null
  }

  return {
    email: session.data.userEmail,
  }
})

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'Blended learning tool',
    },
  ],
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
        <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
