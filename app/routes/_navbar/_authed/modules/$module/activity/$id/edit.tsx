import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuiz,
  createQuizType,
  getActivity,
  getQuizCardsInfo,
  updateActivity,
} from '../../../../../../../util/databaseFunctions';
import { Suspense, useEffect, useState } from 'react';
import { EditActivityForm } from '../../../../../../../components/Activity/EditActivityForm';
import { useForm } from '@tanstack/react-form';
import { Activities } from '@prisma/client';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { QuizCard } from '../../../../../../../components/Form/QuizCard';
import { EditGroups } from '../../../../../../../components/Groups/EditGroups';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/edit'
)({
  component: ActivityComponent,
});

function ActivityComponent() {
  const { module, id } = Route.useParams();

  const activity = useQuery({
    queryKey: ['id', module, id, 'ActivityEdit'],
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
        create: [{ position: 1, questionID: questionID }],
      },
    };

    return newQuizInfo;
  };

  const quizInfo = useQuery({
    queryKey: ['quizInfo', module, id, 'editActivity'],
    queryFn: () => getQuizCardsInfo(id),
  });

  return (
    <div className="w-screen overflow-auto bg-violet-200 p-2 h-full text-black">
      <Suspense>
        {activityInfo ? (
          <div className="">
            <EditActivityForm
              activityInfo={activityInfo}
              form={form}
              setActivityInfo={setActivityInfo}
            ></EditActivityForm>
            <div className="grid grid-cols-2">
              <EditGroups activityID={id} />
              <div>
                <button
                  onClick={async () =>
                    await createQuizMutation.mutateAsync(newQuiz())
                  }
                  className="cursor-pointer"
                >
                  Create Quiz
                </button>
                {quizInfo.isSuccess ? (
                  quizInfo.data.map((quiz) => (
                    <QuizCard
                      moduleCode={module}
                      activity={id}
                      quizInfo={quiz}
                    />
                  ))
                ) : (
                  <div>Loading Quizzes</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Suspense>
    </div>
  );
}
