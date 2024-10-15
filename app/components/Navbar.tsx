import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <div
      className={`absolute flex h-[var(--navbar-height)] w-screen items-center bg-slate-800 text-white`}
    >
      <Link
        to="/"
        activeProps={{
          className: 'text-sky-400'
        }}
        className="items-center justify-center p-3 font-bold hover:text-sky-400"
      >
        Home
      </Link>
    </div>
  );
};
