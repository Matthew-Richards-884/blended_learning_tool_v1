import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { PrismaClient, UserType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import {
  getActivitiesByModule,
  getModule,
} from '../../../../../util/databaseFunctions';
import { getAppSession } from '../../../../../components/Navbar';
import { ActivityDisplay } from '../../../../../components/ActivityDisplay';
import { ActivityTooltip } from '../../../../../components/ActivityTooltip';

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
          className="relative flex flex-initial items-center"
          to="/modules/$module/activity/new"
          params={{ module: module }}
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <ActivityTooltip id="create-activity" text={'Create Activity'} />
        </Link>
      </div>
      {activities?.map((v) => (
        <ActivityDisplay module={module} v={v} />
      ))}
    </div>
  );
}
