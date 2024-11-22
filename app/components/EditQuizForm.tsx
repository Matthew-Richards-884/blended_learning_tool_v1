import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { QuestionInfo, QuizQuestion } from './QuizQuestion';
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import { QuestionType } from '@prisma/client';
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

export const EditQuizForm = ({ quizID }) => {
  const quizSubmissionMutation = useMutation({
    mutationFn: (params: { quizIDT; sessionT; dateT }) =>
      createQuizSubmission({
        quizID: params.quizIDT,
        userID: params.sessionT.data.userEmail,
        completeDate: params.dateT,
      }),
  });

  // const quizResponseMutation = useMutation({
  //   mutationFn: (response: responseType) => createQuizResponse(response),
  // });

  const session = useQuery({
    queryKey: ['session', 'editQuizForm'],
    queryFn: () => getAppSession(),
  }).data;

  const quizData = useQuery({
    queryKey: ['quizInfo', 'radio', 'editQuizForm', quizID],
    queryFn: () => getAllQuizInfo(quizID),
  });

  if (quizData.isSuccess && quizData.data) {
    type questionsObject = {
      [id: number]: (typeof quizData.data.questions)[0];
    };
    const orderedQuestions: questionsObject = {};
    quizData.data?.QuizQuestionOrder?.forEach((element) => {
      const question = quizData.data?.questions.filter(
        (v) => v.id == element.questionID
      )[0];
      question ? (orderedQuestions[element.position] = question) : null;
    });
    const orderedQuestionArray = Object.values(orderedQuestions);
    quizData.data.questions = orderedQuestionArray;

    const form = useForm({
      defaultValues: {},
      onSubmit: async ({ value, formApi }) => {
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
            const question = quizInfo.questions.filter((e) => e.title == k)[0];
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
        }
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

    const [quizInfo, setQuizInfo] = useState(quizData.data);
    console.log('QUIZ INFO', quizInfo);

    // useEffect(
    //   () => setQuizInfo(orderedQuestionArray),
    //   [quizData]
    // );
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
                <div>Something went wrong. QuizID is invalid or missing.</div>
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
  }
};
