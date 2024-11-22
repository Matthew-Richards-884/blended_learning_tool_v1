import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { QuestionInfo, QuizQuestion } from './QuizQuestion';
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import {
  Activities,
  QuestionType,
  QuizQuestionAnswers,
  QuizQuestions,
  Quizzes,
} from '@prisma/client';
import {
  createQuizResponse,
  createQuizSubmission,
  getAllQuizInfo,
  getAllQuizMCQInfo,
  getAllQuizTextInfo,
  getQuizQuestionOrder,
  getQuizzesByActivity,
  responseType,
} from '../util/databaseFunctions';
import { Suspense, useEffect, useState } from 'react';
import { getAppSession } from './Navbar';
import { Prisma, PrismaClient } from '@prisma/client';
import { EditQuizQuestion } from './EditQuizQuestion';

const prisma = new PrismaClient();

export const NewQuizForm = () => {
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

  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value, formApi }) => {
      // Do something with form data
      // const date = new Date();
      // const submission = await quizSubmissionMutation.mutateAsync({
      //   quizIDT: quizID,
      //   sessionT: session,
      //   dateT: date,
      // });
      // console.log('MUTATE', submission);
      // // const submission = { id: 2 };
      // const submissionID = submission.id;
      // const responses: responseType = { data: [] };
      // if (submissionID) {
      //   Object.entries(value).forEach(async ([k, v]: [k: string, v: any]) => {
      //     const question = questionInfo.filter((e) => e.title == k)[0];
      //     question.type == 'text'
      //       ? responses.data.push({
      //           questionID: question.id,
      //           submissionID: submissionID,
      //           type: question.type,
      //           answer: v,
      //           answerID: null,
      //         })
      //       : responses.data.push({
      //           questionID: question.id,
      //           submissionID: submissionID,
      //           type: question.type,
      //           answer: null,
      //           answerID: v,
      //         });
      //   });
      // }
      // console.log('RESPONSE', responses);
      // const responseQuery = await quizResponseMutation.mutateAsync(responses);
      // console.log('RESPONSE QUERY: ', responseQuery);
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  });

  let tempuuid = '';
  const setgetUUID = (uuid?: string) => {
    uuid ? (tempuuid = uuid) : null;
    return tempuuid;
  };

  type quizInfoType = {
    quizID: string;
    questions: (QuizQuestions & {
      QuizQuestionAnswers: QuizQuestionAnswers[];
    })[];
  };

  const [quizInfo, setQuizInfo] = useState({} as quizInfoType);
  const [quizID, setQuizID] = useState('');

  useEffect(() => {
    const quizIDTemp = crypto.randomUUID();
    setQuizID(quizIDTemp);
    setQuizInfo({
      quizID: quizIDTemp,
      questions: [
        {
          id: crypto.randomUUID(),
          title: 'Untitled Question',
          description: 'Description',
          quiz: quizIDTemp,
          type: 'text',
          QuizQuestionAnswers: [],
        },
      ],
    });
  }, []);

  return (
    <div className="bg-violet-200 text-black">
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
            {quizInfo.questions.map((question) => {
              return question ? (
                <EditQuizQuestion
                  form={form}
                  questionInfo={question}
                  key={question.id}
                ></EditQuizQuestion>
              ) : (
                <div>Something Went Wrong</div>
              );
            })}
            {quizID ? (
              <button
                onClick={() =>
                  setQuizInfo({
                    ...quizInfo,
                    questions: [
                      ...quizInfo.questions,
                      {
                        id: setgetUUID(crypto.randomUUID()),
                        title: '',
                        description: '',
                        quiz: quizID,
                        type: 'text',
                        QuizQuestionAnswers: [
                          {
                            id: crypto.randomUUID(),
                            title: '',
                            description: '',
                            question: setgetUUID(),
                            correct: true,
                          },
                        ],
                      },
                    ],
                  })
                }
              >
                ADD QUESTION
              </button>
            ) : (
              <div>QuizID is not defined</div>
            )}
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
