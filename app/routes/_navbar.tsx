import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const NAVBAR_HEIGHT = 3;

export const Route = createFileRoute('/_navbar')({
  component: NavbarComponent,
});

function NavbarComponent() {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
    <div className='relative flex h-screen w-screen justify-center overflow-hidden bg-slate-800'>
      <div
        className='h-screen w-screen bg-slate-800'
        style={
          {
            '--navbar-height': NAVBAR_HEIGHT + 'rem',
          } as React.CSSProperties
        }
      >
        <Navbar></Navbar>
        <div
          className={`mt-[var(--navbar-height)] grid h-[calc(100vh-var(--navbar-height))] grid-cols-6`}
          style={
            {
              '--sidebar-height': `calc(100vh - ${NAVBAR_HEIGHT}rem)`,
            } as React.CSSProperties
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
    </QueryClientProvider>
  );
}
