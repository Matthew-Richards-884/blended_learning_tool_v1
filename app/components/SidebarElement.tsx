import { Link } from '@tanstack/react-router';
import { database } from '../database/database';

export const SidebarElement = ({ module }: { module: string }) => (
  <Link
    to={'/modules/$module'}
    params={{ module: module }}
    className='relative flex h-12 bg-slate-800 py-1 text-white border-b border-slate-400'
  >
    <div className='absolute inset-1 h-min w-fit text-[0.5rem]'>
      <span className=''>{module}</span>&nbsp;
    </div>
    <div className='flex h-min flex-auto self-end'>
      <span className='rounded-md px-1 text-sm'>
        {database.modules[module].title}
      </span>
    </div>
  </Link>
);
