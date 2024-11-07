import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getActivity } from '../../../../../../../util/databaseFunctions';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/'
)({
  component: ActivityComponent,
});

function ActivityComponent() {
  const { module, id } = Route.useParams();

  const state = useQuery({
    queryKey: ['id', module, id],
    queryFn: () => getActivity(id),
  }).data;

  return (
    <div className="w-screen overflow-auto bg-slate-700 p-2 text-white">
      <div className="my-2 rounded-md bg-slate-500 p-2">
        <p>{state?.title}</p>
        <p>{state?.description}</p>
        <p>{state?.duration} minutes</p>
        <p>{state?.deadline as any}</p>
        <p>{state?.module}</p>
      </div>
      <Link
        to="/modules/$module/activity/$id/begin"
        params={{ module: module, id: id }}
      >
        Begin Quiz
      </Link>
    </div>
  );
}
