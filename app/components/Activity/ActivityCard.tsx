import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getModule } from '../../util/databaseFunctions';
import { UUID } from 'crypto';

export const ActivityCard = ({
  name,
  action,
  moduleCode,
  deadline,
}: {
  name: string;
  action: string;
  moduleCode: string;
  deadline: Date;
}) => (
  <Link
    to="/modules/$module/activity/$id"
    params={{ module: moduleCode, id: action.toString() }}
    className="relative m-1 flex h-14 rounded-md bg-slate-400 p-1 text-black"
  >
    <div className="absolute inset-1 h-min w-fit text-[0.5rem]">
      <span className="">{moduleCode}</span>&nbsp;
      <span className="">
        {
          useQuery({
            queryKey: ['moduleData', moduleCode, 'ActivityCard'],
            queryFn: () => getModule(moduleCode),
          }).data?.title
        }
      </span>
    </div>
    <div className="absolute right-1 top-1 h-min w-fit text-[0.5rem]">
      Due Date: {deadline.toDateString()}
    </div>
    <div className="flex h-min flex-auto self-end">
      <p className="flex-auto">{name}</p>
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
