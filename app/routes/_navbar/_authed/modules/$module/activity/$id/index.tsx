import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  getActivity,
  getBoardByActivity,
} from '../../../../../../../util/databaseFunctions';
import { ActivityDisplay } from '../../../../../../../components/Activity/ActivityDisplay';
import { DiscussionBoard } from '../../../../../../../components/Boards/DiscussionBoard';
import { Activities } from '@prisma/client';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/'
)({
  component: ActivityComponent,
});

function ActivityComponent() {
  const { module, id } = Route.useParams();

  const state = useQuery({
    queryKey: ['id', module, id, 'ActivityComponent'],
    queryFn: () => getActivity(id),
  });

  const board = useQuery({
    queryKey: ['board', module, id, 'ActivityComponent'],
    queryFn: () => getBoardByActivity(id),
  });

  return (
    <div className="w-screen overflow-auto bg-slate-700 p-2 text-white">
      {state.isSuccess && state.data ? (
        <ActivityDisplay v={state.data as Activities} module={module} />
      ) : (
        <div>Loading...</div>
      )}

      <Link
        to="/modules/$module/activity/$id/begin"
        params={{ module: module, id: id }}
      >
        Begin Quiz
      </Link>
      {board.isSuccess && board.data ? (
        <DiscussionBoard boardCode={board.data.id} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
