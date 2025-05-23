import { Link } from '@tanstack/react-router';
import { Activities } from '@prisma/client';
import { Tooltip } from './Tooltip';
import { useQuery } from '@tanstack/react-query';
import { getAppSession } from '../Navbar';

export const ActivityDisplay = ({
  v,
  module,
}: {
  v: Activities;
  module: string;
}) => {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  return (
    <div
      key={v.title}
      className="my-1 flex bg-slate-50 p-2 text-black shadow-md"
    >
      <div className="flex-grow">
        <div>{v.title}</div>
        <div className="text-sm">{v.description}</div>
        <div className="text-sm">Expected duration: {v.duration} minutes</div>
        <div className="text-sm">Due: {new Date(v.deadline).toUTCString()}</div>
      </div>
      <div className="flex flex-none flex-col items-center justify-around align-middle">
        {session?.data.userType == 'Teacher' ? (
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
            <Tooltip id={v.id + '-edit'} text={'Edit'} />
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
          <Tooltip id={v.id + '-view'} text={'View Activity'} />
        </Link>
      </div>
    </div>
  );
};
