import { createFileRoute, Link } from '@tanstack/react-router';
import { skipToken, useQuery } from '@tanstack/react-query';
import {
  getActivity,
  getGroup,
  getQuizzesByActivity,
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

  const quizzes = useQuery({
    queryKey: ['quizzes', id],
    queryFn: () => getQuizzesByActivity(id),
  }).data;

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

        <div className="">
          {quizzes?.map((q) => (
            <Link
              to="/modules/$module/activity/$id/quiz/$quiz/begin"
              params={{ module: module, id: id, quiz: q.id }}
              key={q.id}
            >
              Begin Quiz {q.title}
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
