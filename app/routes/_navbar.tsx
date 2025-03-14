import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import '../styles/main.css';


export const NAVBAR_HEIGHT = 3;

export const Route = createFileRoute('/_navbar')({
  component: NavbarComponent,
});

function NavbarComponent() {
  const [queryClient] = useState(() => new QueryClient());
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {loaded ? (
        <div className="relative flex h-screen w-screen justify-center overflow-hidden bg-slate-800">
          <div
            className="h-screen w-screen bg-slate-800"
            style={
              {
                '--navbar-height': NAVBAR_HEIGHT + 'rem',
              } as React.CSSProperties
            }
          >
            <Navbar></Navbar>
            <div
              className={`mt-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))]`}
              style={
                {
                  '--content-height': `calc(100vh - ${NAVBAR_HEIGHT}rem)`,
                } as React.CSSProperties
              }
            >
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </QueryClientProvider>
  );
}
