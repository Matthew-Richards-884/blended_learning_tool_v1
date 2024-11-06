import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { QuizQuestion } from './QuizQuestion';
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuizResponse,
  createQuizSubmission,
  getAllQuizMCQInfo,
  getAllQuizTextInfo,
  getQuizQuestionOrder,
  getQuizzesByActivity,
  responseType,
} from '../util/databaseFunctions';
import { Suspense } from 'react';
import { getAppSession } from './Navbar';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ActivityForm = ({ activityID }) => {
  const quizSubmissionMutation = useMutation({
    mutationFn: (params: { quizIDT; sessionT; dateT }) =>
      createQuizSubmission({
        quizID: params.quizIDT,
        userID: params.sessionT.data.userEmail,
        completeDate: params.dateT,
      }),
  });

  const quizResponseMutation = useMutation({
    mutationFn: (response: responseType) => createQuizResponse(response),
  });

  const session = useQuery({
    queryKey: ['session', 'navbar'],
    queryFn: () => getAppSession(),
  }).data;

  const quizzes = useQuery({
    queryKey: ['quizzes', activityID, 'activityForm'],
    queryFn: () => getQuizzesByActivity(parseInt(activityID)),
  }).data;

  const quizID = quizzes && quizzes.length > 0 ? quizzes[0].id : undefined;

  const radioInfo = useQuery({
    queryKey: ['quizInfo', 'radio', activityID, 'activityForm', quizID],
    queryFn: quizID ? () => getAllQuizMCQInfo(quizID) : skipToken,
    enabled: !!(quizzes && quizzes.length > 0),
  }).data;
  console.log('INFO', radioInfo);

  const textInfo = useQuery({
    queryKey: ['quizInfo', 'text', activityID, 'activityForm', quizID],
    queryFn: quizID ? () => getAllQuizTextInfo(quizID) : skipToken,
    enabled: !!(quizzes && quizzes.length > 0),
  }).data;
  console.log('INFO 2', textInfo);

  const questionOrder = useQuery({
    queryKey: ['questionOrder', activityID, 'activityForm', quizID],
    queryFn: quizID ? () => getQuizQuestionOrder(quizID) : skipToken,
    enabled: !!(quizzes && quizzes.length > 0),
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
        sessionT: session,
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
                answerID: parseInt(v),
              });
        });
      }
      console.log('RESPONSE', responses);
      const responseQuery = await quizResponseMutation.mutateAsync(responses);

      console.log('RESPONSE QUERY: ', responseQuery);
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  });

  return (
    <div className="bg-slate-200 text-black">
      <h1>Quiz</h1>
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
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        />
      </form>
    </div>
  );
};
