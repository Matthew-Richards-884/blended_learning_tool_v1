import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { QuizQuestion } from './QuizQuestion';
import { skipToken, useQuery } from '@tanstack/react-query';
import {
  getActivity,
  getAllQuizMCQInfo,
  getAllQuizTextInfo,
  getQuizQuestionOrder,
  getQuizQuestions,
  getQuizzesByActivity,
} from '../util/databaseFunctions';
import { Suspense } from 'react';
import { getAppSession } from './Navbar';

export const ActivityForm = ({ activityID }) => {
  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log('THIS IS THE ANSWER', value);
      console.log('SOMETHING HERE');
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  });

  const session = useQuery({
    queryKey: ['session', 'navbar'],
    queryFn: () => getAppSession(),
  }).data;

  const quizzes = useQuery({
    queryKey: ['quizzes', activityID, 'activityForm'],
    queryFn: () => getQuizzesByActivity(parseInt(activityID)),
  }).data;

  const radioInfo = useQuery({
    queryKey: [
      'quizInfo',
      'radio',
      activityID,
      'activityForm',
      quizzes && quizzes.length > 0 ? quizzes[0].id : undefined,
    ],
    queryFn:
      quizzes && quizzes.length > 0
        ? () => getAllQuizMCQInfo(quizzes[0].id)
        : skipToken,
    enabled: !!(quizzes && quizzes.length > 0),
  }).data;
  console.log('INFO', radioInfo);

  const textInfo = useQuery({
    queryKey: [
      'quizInfo',
      'text',
      activityID,
      'activityForm',
      quizzes && quizzes.length > 0 ? quizzes[0].id : undefined,
    ],
    queryFn:
      quizzes && quizzes.length > 0
        ? () => getAllQuizTextInfo(quizzes[0].id)
        : skipToken,
    enabled: !!(quizzes && quizzes.length > 0),
  }).data;
  console.log('INFO 2', textInfo);

  const questionOrder = useQuery({
    queryKey: [
      'questionOrder',
      activityID,
      'activityForm',
      quizzes && quizzes.length > 0 ? quizzes[0].id : undefined,
    ],
    queryFn:
      quizzes && quizzes.length > 0
        ? () => getQuizQuestionOrder(quizzes[0].id)
        : skipToken,
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
  const orderedQuestionArray = Object.values(orderedQuestions);
  console.log('QUESTIONS', orderedQuestionArray);

  return (
    <div className="bg-slate-200 text-black">
      <h1>Quiz</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="p-2">
          <Suspense fallback={<div>Loading!</div>}>
            {orderedQuestionArray?.map((question) => (
              <QuizQuestion
                form={form}
                questionInfo={question}
                key={question.id}
              ></QuizQuestion>
            ))}
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
