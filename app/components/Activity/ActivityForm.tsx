import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { QuizQuestion } from '../Form/QuizQuestion';
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuizResponse,
  createQuizSubmission,
  getAllQuizMCQInfo,
  getAllQuizTextInfo,
  getGroupUsers,
  getQuizData,
  getQuizQuestionOrder,
  getQuizzesByActivity,
  getUserByEmail,
  responseType,
} from '../../util/databaseFunctions';
import { Suspense } from 'react';
import { getAppSession } from '../Navbar';
import { Prisma, PrismaClient } from '@prisma/client';
import { redirect, useRouter } from '@tanstack/react-router';

const prisma = new PrismaClient();

export const ActivityForm = ({
  module,
  activityID,
  quizID,
  group,
}: {
  module: string;
  activityID: string;
  quizID: string;
  group?: string;
}) => {
  const router = useRouter();

  const groupUsers = useQuery({
    queryKey: ['activity', activityID, 'group', group],
    queryFn: group ? () => getGroupUsers(group) : skipToken,
    enabled: !!group,
  }).data;

  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  const user = useQuery({
    queryKey: ['user'],
    queryFn: session
      ? () => getUserByEmail(session!.data.userEmail)
      : skipToken,
    enabled: !!session,
  }).data;

  const quizData = useQuery({
    queryKey: ['quiz', quizID],
    queryFn: () => getQuizData(quizID),
  }).data;

  const quizSubmissionMutation = useMutation({
    mutationFn: (params: { quizIDT; dateT }) =>
      createQuizSubmission({
        quizID: params.quizIDT,
        users: group ? groupUsers! : [user!],
        completeDate: params.dateT,
      }),
    onSuccess: async () => {
      await router.invalidate();
      router.navigate({
        to: '/modules/$module/activity/$id',
        params: { id: activityID, module: module },
      });
      return;
    },
  });

  const quizResponseMutation = useMutation({
    mutationFn: (response: responseType) => createQuizResponse(response),
  });

  // const quizID = quizzes && quizzes.length > 0 ? quizzes[0].id : undefined;

  const radioInfo = useQuery({
    queryKey: ['quizInfo', 'radio', activityID, 'activityForm', quizID],
    queryFn: () => getAllQuizMCQInfo(quizID),
  }).data;
  console.log('INFO', radioInfo);

  const textInfo = useQuery({
    queryKey: ['quizInfo', 'text', activityID, 'activityForm', quizID],
    queryFn: () => getAllQuizTextInfo(quizID),
  }).data;
  console.log('INFO 2', textInfo);

  const questionOrder = useQuery({
    queryKey: ['questionOrder', activityID, 'activityForm', quizID],
    queryFn: () => getQuizQuestionOrder(quizID),
  }).data;
  questionOrder?.reverse();
  console.log('INFO', questionOrder);

  const questions =
    radioInfo && textInfo ? radioInfo.concat(textInfo as any) : [];

  type questionsObject = {
    [id: number]: (typeof questions)[0];
  };
  const orderedQuestions: questionsObject = {};
  questionOrder?.forEach((element) => {
    const question = questions.filter((v) => v.id == element.questionID)[0];
    orderedQuestions[element.position] = question;
  });
  console.log('UNORDERED', questions);
  const orderedQuestionArray = Object.values(orderedQuestions);
  console.log('QUESTIONS', orderedQuestionArray);
  console.log(questions);

  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value, formApi }) => {
      // Do something with form data
      console.log('THIS IS THE ANSWER', value);
      console.log('THIS IS THE FORMAPI', formApi);
      console.log('SOMETHING HERE');
      console.log(quizID, session);
      const date = new Date();
      const submission = await quizSubmissionMutation.mutateAsync({
        quizIDT: quizID,
        dateT: date,
      });
      console.log('MUTATE', submission);
      // const submission = { id: 2 };
      const submissionID = submission.id;
      const responses: responseType = { data: [] };
      if (submissionID) {
        Object.entries(value).forEach(async ([k, v]: [k: string, v: any]) => {
          const question = questions.filter((e) => e.title == k)[0];
          question.type == 'text'
            ? responses.data.push({
                questionID: question.id,
                submissionID: submissionID,
                type: question.type,
                answer: v,
                answerID: null,
              })
            : responses.data.push({
                questionID: question.id,
                submissionID: submissionID,
                type: question.type,
                answer: null,
                answerID: v,
              });
        });
        if (groupUsers) {
        }
      }
      console.log('RESPONSE', responses);
      const responseQuery = await quizResponseMutation.mutateAsync(responses);

      console.log('RESPONSE QUERY: ', responseQuery);
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  });

  return (
    <div className="h-full overflow-auto bg-slate-200 text-black">
      <div className="grid grid-cols-5">
        <div className="col-span-1"></div>
        <div className="col-span-3 m-3 rounded-md bg-gray-50 p-5 shadow-md">
          <div className="flex w-full flex-col justify-center">
            <h1 className="flex justify-center text-3xl">{quizData?.title}</h1>
            <h2 className="flex justify-center text-xl text-gray-800">
              {quizData?.description}
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              console.log('E', e);
              e.preventDefault();
              e.stopPropagation();
              console.log('FIELD INFO', form.fieldInfo);
              form.handleSubmit();
            }}
          >
            <div className="p-2">
              <Suspense fallback={<div>Loading!</div>}>
                {orderedQuestionArray?.map((question) => {
                  return question ? (
                    <QuizQuestion
                      form={form}
                      questionInfo={question}
                      key={question.id}
                    ></QuizQuestion>
                  ) : (
                    <div>Something Went Wrong</div>
                  );
                })}
              </Suspense>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="cursor-pointer rounded-sm bg-gray-200 px-2 shadow-md hover:bg-gray-300"
                >
                  {isSubmitting ? '...' : 'Submit'}
                </button>
              )}
            />
          </form>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};
