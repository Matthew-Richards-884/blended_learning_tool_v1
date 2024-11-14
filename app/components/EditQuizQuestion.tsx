import { FieldApi } from '@tanstack/react-form';
import { FieldInfo } from './FieldInfo';
import { z } from 'zod';
import { QuestionInfo } from './QuizQuestion';
import { QuestionType } from '@prisma/client';
import { useState } from 'react';

export function EditQuizQuestion({
  form,
  questionInfo,
}: {
  form: any;
  questionInfo: QuestionInfo;
}) {
  const questionClass =
    'flex focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 transition-all';

  const [question, setQuestion] = useState(questionInfo);
  return (
    <div
      className="mt-3 rounded-md bg-slate-50 p-3"
      key={'Question:' + question.id}
    >
      <form.Field
        name={question.id.toString() + '-question'}
        children={(field: FieldApi<any, any, any, any, any>) => (
          <div>
            <div
              className={`${questionClass} w-3/5 border-b border-gray-300 drop-shadow-sm`}
            >
              <input
                id={field.name}
                name={field.name}
                value={question.title ?? ''}
                placeholder="Question"
                onBlur={field.handleBlur}
                onChange={(e) =>
                  setQuestion({ ...question, title: e.target.value })
                }
                className="w-full flex-1 border-0 bg-transparent py-3 pl-1 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:leading-6"
              />
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      ></form.Field>
      <form.Field
        name={question.id + '-question-description'}
        children={(field: FieldApi<any, any, any, any, any>) => (
          <div>
            <div
              className={`${questionClass} w-full border-b border-gray-300 drop-shadow-sm`}
            >
              <input
                id={field.name}
                name={field.name}
                value={question.description ?? ''}
                placeholder="Description"
                onBlur={field.handleBlur}
                onChange={(e) =>
                  setQuestion({ ...question, description: e.target.value })
                }
                className="flex-grow border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}
      ></form.Field>
      {question.type == 'text' ? (
        <div>
          <form.Field
            name={
              question.id +
              '-question-' +
              question.QuizQuestionAnswers[0].id.toString() +
              '-answer'
            }
            children={(field: FieldApi<any, any, any, any, any>) => (
              <div>
                <div className={questionClass}>
                  <input
                    id={field.name}
                    name={field.name}
                    value={question.QuizQuestionAnswers[0].title}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        QuizQuestionAnswers: [
                          {
                            ...question.QuizQuestionAnswers[0],
                            title: e.target.value,
                          },
                        ],
                      })
                    }
                    className="flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <FieldInfo field={field} />
              </div>
            )}
          ></form.Field>
          <form.Field
            name={
              question.id +
              '-question-' +
              question.QuizQuestionAnswers[0].id +
              '-answer-description'
            }
            children={(field: FieldApi<any, any, any, any, any>) => (
              <div>
                <div className={questionClass}>
                  <input
                    id={field.name}
                    name={field.name}
                    value={question.QuizQuestionAnswers[0].description ?? ''}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        QuizQuestionAnswers: [
                          {
                            ...question.QuizQuestionAnswers[0],
                            description: e.target.value,
                          },
                        ],
                      })
                    }
                    className="flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
          ></form.Field>
        </div>
      ) : (
        <div>
          {question.QuizQuestionAnswers.map((v) => (
            <div
              key={question.id + '-question-' + v.id + '-answer-key'}
              className="p-2"
            >
              <form.Field
                name={question.id + '-question-' + v.id + '-answer'}
                children={(field: FieldApi<any, any, any, any, any>) => (
                  <div className="flex flex-row align-middle">
                    <div className="flex-initial flex">
                      <div className='self-center'>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className={`${questionClass} w-full`}>
                        <input
                          id={field.name}
                          name={field.name}
                          value={v.title}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            setQuestion({
                              ...question,
                              QuizQuestionAnswers: [
                                ...question.QuizQuestionAnswers.slice(
                                  0,
                                  question.QuizQuestionAnswers.findIndex(
                                    (e) => e.id == v.id
                                  )
                                ),
                                {
                                  ...question.QuizQuestionAnswers.find(
                                    (e) => e.id == v.id
                                  )!,
                                  title: e.target.value,
                                },
                                ...question.QuizQuestionAnswers.slice(
                                  question.QuizQuestionAnswers.findIndex(
                                    (e) => e.id == v.id
                                  ) + 1
                                ),
                              ],
                            })
                          }
                          className="flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  </div>
                )}
              ></form.Field>
              <form.Field
                name={question.id + '-question-' + v.id + '-answer-description'}
                children={(field: FieldApi<any, any, any, any, any>) => (
                  <div>
                    <div className={questionClass}>
                      <input
                        id={field.name}
                        name={field.name}
                        value={v.description ?? ''}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          setQuestion({
                            ...question,
                            QuizQuestionAnswers: [
                              ...question.QuizQuestionAnswers.slice(
                                0,
                                question.QuizQuestionAnswers.findIndex(
                                  (e) => e.id == v.id
                                )
                              ),
                              {
                                ...question.QuizQuestionAnswers.find(
                                  (e) => e.id == v.id
                                )!,
                                description: e.target.value,
                              },
                              ...question.QuizQuestionAnswers.slice(
                                question.QuizQuestionAnswers.findIndex(
                                  (e) => e.id == v.id
                                ) + 1
                              ),
                            ],
                          })
                        }
                        className="flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-xs sm:leading-6"
                      />
                    </div>
                  </div>
                )}
              ></form.Field>
            </div>
          ))}
          <button
            onClick={() =>
              setQuestion({
                ...question,
                QuizQuestionAnswers: [
                  ...question.QuizQuestionAnswers,
                  {
                    id: crypto.randomUUID(),
                    title: '',
                    description: '',
                    question: question.id,
                  },
                ],
              })
            }
          >
            ADD ANSWER
          </button>
        </div>
      )}
    </div>
  );
}
