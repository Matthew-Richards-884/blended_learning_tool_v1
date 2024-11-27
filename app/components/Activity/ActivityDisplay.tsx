import { Link } from '@tanstack/react-router';
import { UserType } from '@prisma/client';
import { ActivityTooltip } from './ActivityTooltip';
import { useQuery } from '@tanstack/react-query';
import { getAppSession } from '../Navbar';

export const ActivityDisplay = ({
  v,
  module,
}: {
  v: any;
  module: string;
}) => {
  const session = useQuery({
    queryKey: ['session', 'activityDisplay'],
    queryFn: () => getAppSession(),
  }).data;

  return (
    <div key={v.title} className="my-2 flex rounded-md bg-slate-50 p-2 text-black">
      <div className="flex-grow">
        <div>{v.title}</div>
        <div>{v.description}</div>
        <div>{v.duration} minutes</div>
        <div>Due: {(v.deadline as Date).toString()}</div>
      </div>
      <div className="flex flex-none flex-col items-center justify-around align-middle">
        {session?.data.userType == UserType.Teacher ? (
          <Link
            to="/modules/$module/activity/$id/edit"
            params={{ module: module, id: v.id }}
            className="relative flex w-full flex-row"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="peer size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <ActivityTooltip id={v.id + '-edit'} text={'Edit'} />
          </Link>
        ) : null}
        <Link
          to="/modules/$module/activity/$id"
          params={{ module: module, id: v.id.toString() }}
          className="relative flex w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="peer size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
          <ActivityTooltip id={v.id + '-view'} text={'View Activity'} />
        </Link>
      </div>
    </div>
  );
};
