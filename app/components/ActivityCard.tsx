import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getModule } from '../util/databaseFunctions';

export const ActivityCard = ({
  name,
  action,
  moduleCode,
  deadline,
}: {
  name: string;
  action: number;
  moduleCode: string;
  deadline: Date;
}) => (
  <div className="relative m-1 flex h-12 rounded-md bg-purple-800 p-1 text-white">
    <div className="absolute inset-1 h-min w-fit text-[0.5rem]">
      <span className="">{moduleCode}</span>&nbsp;
      <span className="">
        {
          useQuery({
            queryKey: ['moduleData', moduleCode, "ActivityCard"],
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
      <Link
        to="/modules/$module/activity/$id"
        params={{ module: moduleCode, id: action.toString() }}
        className="rounded-md bg-slate-400 px-1"
      >
        Details
      </Link>
    </div>
  </div>
);
