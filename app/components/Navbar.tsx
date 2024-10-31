import { Link } from '@tanstack/react-router';
import { useAppSession } from '../util/session';
import { useQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/start';

export const getAppSession = createServerFn('GET', async () => {
  return await useAppSession();
});

export const Navbar = () => {
  const session = useQuery({
    queryKey: ['session', 'navbar'],
    queryFn: () => getAppSession(),
  }).data;

  return (
    <div
      className={`absolute flex h-[var(--navbar-height)] w-screen items-center bg-slate-800 text-white`}
    >
      <Link
        to="/"
        activeProps={{
          className: 'text-sky-400',
        }}
        className="items-center justify-center p-3 font-bold hover:text-sky-400"
      >
        Home
      </Link>
      <Link
        to={session?.data.userEmail ? '/logout' : '/login'}
        activeProps={{
          className: 'text-sky-400',
        }}
        className="ms-auto items-center justify-center p-3 font-bold hover:text-sky-400"
      >
        {session?.data.userEmail ? <>Log Out</> : <>Log In</>}
      </Link>
      <div>Hello {session?.data.userEmail}</div>
    </div>
  );
};
