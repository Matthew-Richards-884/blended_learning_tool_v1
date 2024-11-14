import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { PrismaClient, UserType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import {
  getActivitiesByModule,
  getModule,
} from '../../../../../util/databaseFunctions';
import { getAppSession } from '../../../../../components/Navbar';

export const Route = createFileRoute('/_navbar/_authed/modules/$module/')({
  component: ModuleComponent,
});

function ModuleComponent() {
  const { module } = Route.useParams();

  const moduleData = useQuery({
    queryKey: ['moduleData', module],
    queryFn: () => getModule(module),
  }).data;

  const activities = useQuery({
    queryKey: ['activitiesByModule', module],
    queryFn: () => getActivitiesByModule(module),
  }).data;

  const session = useQuery({
    queryKey: ['session', 'navbar'],
    queryFn: () => getAppSession(),
  }).data;
  activities ? console.log('DATE', activities[0].deadline) : null;
  return (
    <div className="w-screen overflow-auto bg-violet-200 p-2 text-black">
      <div className="my-2 flex flex-row rounded-md bg-slate-50 p-2">
        <div className="flex-grow">
          <h1>{module}</h1>
          <h2>{moduleData?.title}</h2>
          <p>{moduleData?.description}</p>
          {/* <h2>Lectures</h2>
      {Object.values(moduleData?.lectures).map((v: any) => (
        <div className="my-2 rounded-md bg-slate-500 p-2">
          <p>{v.name}</p>
          <p>{v.description}</p>
          <p>{v.link}</p>
        </div>
      ))} */}
          <h2>Activities</h2>
        </div>
        <Link
          className="flex flex-initial items-center"
          to="/modules/$module/activity/new"
          params={{ module: module }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
      </div>
      {activities?.map((v) => (
        <div key={v.title} className="my-2 flex rounded-md bg-slate-50 p-2">
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
                params={{ module: module, id: v.id.toString() }}
                className="w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
            ) : null}
            <Link
              to="/modules/$module/activity/$id"
              params={{ module: module, id: v.id.toString() }}
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
