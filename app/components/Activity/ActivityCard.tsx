import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getModule } from '../../util/databaseFunctions';
import { UUID } from 'crypto';
import { Activities, Modules } from '@prisma/client';

export const ActivityCard = ({
  info
}: {
  info: Activities & {Modules: Modules}
}) => (
  <Link
    to="/modules/$module/activity/$id"
    params={{ module: info.module ?? '/module-not-found', id: info.id}}
    className="relative m-1 flex h-14 mx-2 border-b border-black p-1 text-black"
  >
    <div className="absolute inset-1 h-min w-fit text-[0.5rem]">
      <span className="">{info.module}</span>&nbsp;
      <span className="">
        {info.Modules.title}
      </span>
    </div>
    <div className="absolute right-1 top-1 h-min w-fit text-[0.5rem]">
      Due Date: {info.deadline as any as string}
    </div>
    <div className="flex h-min flex-auto self-end">
      <p className="flex-auto">{info.title}</p>
      <span>Details</span>
      {/* <Link
        to="/modules/$module/activity/$id"
        params={{ module: moduleCode, id: action.toString() }}
        className="px-1"
      >
        Details
      </Link> */}
    </div>
  </Link>
);
