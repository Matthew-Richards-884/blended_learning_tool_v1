import { createFileRoute } from '@tanstack/react-router';
import { ActivityForm } from '../../../../../../../../components/Activity/ActivityForm';
import { getGroup } from '../../../../../../../../util/databaseFunctions';
import { useQuery } from '@tanstack/react-query';
import { getAppSession } from '../../../../../../../../components/Navbar';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/begin'
)({
  component: QuizBeginComponent,
});

function QuizBeginComponent() {
  const { module, id, quiz } = Route.useParams();

  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  const group = useQuery({
    queryKey: [id, 'group', session?.data.userEmail],
    queryFn: () => getGroup(id),
  });
  return (
    <ActivityForm
      activityID={id}
      module={module}
      group={group.data?.id}
      quizID={quiz}
    ></ActivityForm>
  );
}
