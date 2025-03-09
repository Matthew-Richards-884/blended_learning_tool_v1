import { createFileRoute } from '@tanstack/react-router';
import { skipToken, useQuery } from '@tanstack/react-query';
import {
  getActivity,
  getGroup,
} from '../../../../../../../util/databaseFunctions';
import { ActivityForm } from '../../../../../../../components/Activity/ActivityForm';
import { Suspense } from 'react';
import { getAppSession } from '../../../../../../../components/Navbar';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/begin'
)({
  component: ActivityComponent,
});

function ActivityComponent() {
  const { module, id } = Route.useParams();

  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  const activity = useQuery({
    queryKey: ['id', module, id, 'activityComponent'],
    queryFn: () => getActivity(id),
  });

  const group = useQuery({
    queryKey: [id, 'group', session?.data.userEmail],
    queryFn: activity.data?.id ? () => getGroup(activity.data!.id) : skipToken,
    enabled: !!activity.data?.id,
  });

  return (
    <div className="flex h-full w-screen flex-col bg-slate-200 p-1 text-black">
      <Suspense>
        <div className="mb-1 rounded-sm bg-slate-300 p-2">
          <p className="text-lg">{activity.data?.title}</p>
          <p>{activity.data?.description}</p>
          <p>{activity.data?.duration} minutes</p>
          <p>
            Due{' '}
            {activity.data
              ? new Date(activity.data?.deadline as any as string).toUTCString()
              : undefined}
          </p>
          <p>{activity.data?.module}</p>
        </div>

        <ActivityForm activityID={id} module={module} group={group.data?.id}></ActivityForm>
      </Suspense>
    </div>
  );
}
