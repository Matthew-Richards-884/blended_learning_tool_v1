import { Link } from '@tanstack/react-router';
import { useAppSession } from '../util/session';
import { useQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/start';
import '../styles/main.css';


export const getAppSession = createServerFn('GET', async () => {
  return await useAppSession();
});

export const Navbar = () => {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  });

  console.log(session);

  const navbarLinkClass =
    'items-center justify-center p-3 font-bold hover:bg-gray-700';

  const NavbarLink = ({ to, text }) => (
    <Link
      to={to}
      activeProps={{
        className: 'bg-gray-600',
      }}
      className={navbarLinkClass}
    >
      {text}
    </Link>
  );

  return (
    <div
      className={`absolute flex h-[var(--navbar-height)] w-screen items-center bg-gray-800 text-white`}
    >
      <NavbarLink to={'/'} text={'Home'} />
      <NavbarLink to={'/calendar'} text={'Calendar'} />
      <NavbarLink to={'/options'} text={'Options'} />
      {session.isSuccess && session.data.data.userEmail ? (
        <div className="ms-auto flex flex-row">
          <NavbarLink
            to={session.data.data.userEmail ? '/logout' : '/login'}
            text={session.data.data.userEmail ? <>Log Out</> : <>Log In</>}
          />
          <div className='flex my-auto'>{session.data.data.userEmail}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
