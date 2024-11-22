import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuiz,
  createQuizType,
  getActivity,
  updateActivity,
} from '../../../../../../../util/databaseFunctions';
import { Suspense, useEffect, useState } from 'react';
import { EditActivityForm } from '../../../../../../../components/EditActivityForm';
import { useForm } from '@tanstack/react-form';
import { Activities } from '@prisma/client';
import { zodValidator } from '@tanstack/zod-form-adapter';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/edit'
)({
  component: ActivityComponent,
});

function ActivityComponent() {
  const { module, id } = Route.useParams();

  const activity = useQuery({
    queryKey: ['id', module, id, 'activityComponent'],
    queryFn: () => getActivity(id),
  });

  const [activityInfo, setActivityInfo] = useState(activity.data);

  useEffect(() => {
    setActivityInfo(activity.data);
  }, [activity]);

  const router = useRouter();
  const createActivityMutation = useMutation({
    mutationFn: (activity: typeof activityInfo) =>
      updateActivity(activity as Activities),
    onSuccess: async () => {
      await router.invalidate();
      router.navigate({
        to: activityInfo ? '/modules/$module/activity/$id' : '/modules/$module',
        params: { id: activityInfo!.id, module: module },
      });
      return;
    },
  });

  const form = useForm({
    defaultValues: {},
    onSubmit: async () => {
      console.log('Actual value: ', activityInfo);
      const activityQuery =
        await createActivityMutation.mutateAsync(activityInfo);
      console.log(activityQuery);
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  }) as any;

  console.log(activityInfo);

  const createQuizMutation = useMutation({
    mutationFn: (activity: createQuizType) => createQuiz(activity),
  });

  const newQuiz = () => {
    const newID = crypto.randomUUID();
    const questionID = crypto.randomUUID();
    const newQuizInfo: createQuizType = {
      id: newID,
      title: '',
      description: '',
      activity: activity.data?.id ?? null,
      questions: {
        create: [
          {
            id: questionID,
            title: '',
            description: '',
            type: 'text',
            QuizQuestionAnswers: {
              create: [
                {
                  id: crypto.randomUUID(),
                  title: '',
                  description: '',
                  correct: true,
                },
              ],
            },
          },
        ],
      },
      QuizQuestionOrder: {
        create: [{ position: 1, questionID: questionID}],
      },
    };

    return newQuizInfo;
  };

  return (
    <div className="w-screen overflow-auto bg-slate-700 p-2 text-white">
      <Suspense>
        {activityInfo ? (
          <div className="my-2 rounded-md bg-violet-200 p-2">
            <EditActivityForm
              activityInfo={activityInfo}
              form={form}
              setActivityInfo={setActivityInfo}
            ></EditActivityForm>
            <button
              onClick={async () =>
                await createQuizMutation.mutateAsync(newQuiz())
              }
            >
              Create Quiz
            </button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Suspense>
    </div>
  );
}
