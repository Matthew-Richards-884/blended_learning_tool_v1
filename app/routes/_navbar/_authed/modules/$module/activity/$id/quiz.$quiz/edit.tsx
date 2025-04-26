import { createFileRoute } from '@tanstack/react-router';
import { EditQuizForm } from '../../../../../../../../components/Form/EditQuizForm';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/quiz/$quiz/edit'
)({
  component: QuizEditComponent,
});

function QuizEditComponent() {
  const { module, id, quiz } = Route.useParams();

  return <EditQuizForm module={module} quizID={quiz} activityID={id} />;
}
