import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getActivity } from '../../../../../../../util/databaseFunctions';
import { ActivityDisplay } from '../../../../../../../components/Activity/ActivityDisplay';

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
  });

  return (
    <div className="w-screen overflow-auto bg-slate-700 p-2 text-white">
      {state.isSuccess ? (
        <ActivityDisplay v={state.data} module={module} />
      ) : (
        <div>Loading...</div>
      )}

      <Link
        to="/modules/$module/activity/$id/begin"
        params={{ module: module, id: id }}
      >
        Begin Quiz
      </Link>
    </div>
  );
}
