import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuizSubmission,
  getAllQuizInfo,
  responseType,
  updateQuiz,
} from '../../util/databaseFunctions';
import { Suspense, useEffect, useState } from 'react';
import { getAppSession } from '../Navbar';
import {
  $Enums,
  Prisma,
  PrismaClient,
  QuestionType,
  QuizQuestionAnswers,
  QuizQuestionOrder,
  QuizQuestions,
  Quizzes,
} from '@prisma/client';
import { EditQuizQuestion } from './EditQuizQuestion';
import { ActivityTooltip } from '../Activity/ActivityTooltip';

const prisma = new PrismaClient();

export type question = {
  QuizQuestionAnswers: {
    id: string;
    title: string;
    description: string | null;
    correct: boolean;
    question: string | null;
  }[];
  id: string;
  title: string;
  description: string | null;
  type: $Enums.QuestionType;
  quiz: string | null;
};

export const EditQuizForm = ({ quizID }) => {
  const quizEditMutation = useMutation({
    mutationFn: (
      quizInfo: Quizzes & {
        QuizQuestionOrder: QuizQuestionOrder[];
        questions: (QuizQuestions & {
          QuizQuestionAnswers: QuizQuestionAnswers[];
        })[];
      }
    ) => updateQuiz(quizInfo),
  });

  const session = useQuery({
    queryKey: ['session', 'editQuizForm'],
    queryFn: () => getAppSession(),
  }).data;

  const quizData = useQuery({
    queryKey: ['quizInfo', 'radio', 'editQuizForm', quizID],
    queryFn: () => getAllQuizInfo(quizID),
  });

  type questionsObject = {
    [id: number]: question;
  };

  const [quizInfo, setQuizInfo] = useState(quizData.data);

  const orderQuestions = (
    data: {
      questions: ({
        QuizQuestionAnswers: QuizQuestionAnswers[];
      } & QuizQuestions)[];
      QuizQuestionOrder: QuizQuestionOrder[];
    } & Quizzes
  ) => {
    const orderedQuestions: questionsObject = {};
    data.QuizQuestionOrder.forEach((element) => {
      const question = data.questions.filter(
        (v) => v.id == element.questionID
      )[0];
      question ? (orderedQuestions[element.position] = question) : null;
    });
    return Object.values(orderedQuestions);
  };

  if (quizData.isSuccess && quizData.data && quizData.data.QuizQuestionOrder) {
    quizData.data.questions = orderQuestions(quizData.data);
  }

  useEffect(() => setQuizInfo(quizData.data), [quizData]);

  const form = useForm({
    defaultValues: {
      questions: quizInfo?.questions ?? ([] as question[]),
    },
    onSubmit: async ({ value }) => {
      console.log('QUIZ VALUE:', value);
      if (quizInfo && value.questions) {
        quizEditMutation.mutateAsync({
          ...quizInfo,
          questions: value.questions,
        });
      }
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  });

  const newQuestion = () => {
    const questionID = crypto.randomUUID();
    return {
      QuizQuestionAnswers: [
        {
          id: crypto.randomUUID(),
          title: '',
          description: '',
          correct: true,
          question: questionID,
        },
      ],
      id: questionID,
      title: '',
      description: '',
      type: 'text',
      quiz: quizID,
    };
  };

  return (
    <div className="col-span-6 h-full overflow-auto bg-violet-200 text-black">
      {quizInfo ? (
        <div>
          <form
            onSubmit={(e) => {
              console.log('E', e);
              e.preventDefault();
              e.stopPropagation();
              console.log('FIELD INFO', form.fieldInfo);
              form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-6 p-2">
              <div className="col-start-2 col-end-6">
                <Suspense fallback={<div>Loading!</div>}>
                  <div>
                    <h1 className="text-2xl">{quizInfo.title}</h1>
                    <h2 className="text-lg">{quizInfo.description}</h2>
                    <button
                      type="button"
                      onClick={() =>
                        form.pushFieldValue(
                          'questions',
                          newQuestion() as question
                        )
                      }
                      className="relative cursor-pointer rounded-sm bg-gray-100 px-1 shadow-md hover:bg-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="peer size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <ActivityTooltip
                        id={'add-quiz-question'}
                        text={'Add Question'}
                      />
                    </button>
                  </div>
                  <div>
                    <form.Field
                      name="questions"
                      mode="array"
                      children={(field) =>
                        field.state.value.map((question, index) => (
                          <div className="flex flex-row" key={index}>
                            <div className="flex flex-auto">
                              <EditQuizQuestion
                                form={form}
                                question={question}
                                index={index}
                                key={index}
                              ></EditQuizQuestion>
                            </div>
                            <div className="ms-1 mt-2 flex">
                              <button
                                type="button"
                                onClick={() => field.removeValue(index)}
                                className="relative mt-1 flex h-min w-min flex-auto cursor-pointer flex-row rounded-sm bg-gray-100 shadow-md hover:bg-gray-200"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="peer size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                                <ActivityTooltip
                                  id={'remove-quiz-question-' + index}
                                  text={'Remove Question'}
                                />
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    />
                  </div>
                </Suspense>
              </div>
              <div>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="cursor-pointer rounded-sm bg-gray-100 px-1 shadow-md hover:bg-gray-200"
                    >
                      {isSubmitting ? '...' : 'Save'}
                    </button>
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading Questions...</div>
      )}
    </div>
  );
};
