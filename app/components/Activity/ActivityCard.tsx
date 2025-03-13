import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getModule } from '../../util/databaseFunctions';
import { UUID } from 'crypto';
import { Activities, Modules } from '@prisma/client';

export const ActivityCard = ({
  info,
}: {
  info: Activities & { Modules: Modules };
}) => (
  <Link
    to="/modules/$module/activity/$id"
    params={{ module: info.module ?? '/module-not-found', id: info.id }}
    className="relative m-1 mx-2 flex min-h-16 flex-col bg-gray-50 p-3 text-black shadow-md"
  >
    <div className="flex w-full">
      <div className="absolute inset-3 h-min w-fit text-[0.5rem] text-gray-600">
        <span className="">{info.module}</span>&nbsp;
        <span className="">{info.Modules.title}</span>
      </div>
      <div className="absolute top-3 right-3 h-min w-fit text-[0.5rem] text-gray-600">
        Due Date: {new Date(info.deadline).toUTCString()}
      </div>
    </div>
    <div className="mt-3 flex flex-row">
      <div className="flex h-min flex-col self-end md:flex-row flex-auto">
        <p className="me-5 flex">{info.title}</p>
        <div className="flex text-gray-600">{info.description}</div>
      </div>
      <span className="ms-auto">Details</span>
    </div>
  </Link>
);
