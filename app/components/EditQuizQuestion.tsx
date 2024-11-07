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
  const [question, setQuestion] = useState(questionInfo);
  return (
    <div className="mt-3 p-2" key={'Question:' + question.id}>
      <form.Field
        name={question.id.toString() + '-question'}
        children={(field: FieldApi<any, any, any, any, any>) => (
          <div>
            {/* <label
              htmlFor={field.name}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {question.title}
            </label> */}
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id={field.name}
                name={field.name}
                value={question.title}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  setQuestion({ ...question, title: e.target.value })
                }
                className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            <label
              htmlFor={field.name}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id={field.name}
                name={field.name}
                value={question.description ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  setQuestion({ ...question, description: e.target.value })
                }
                className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Answer
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Answer Description
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
              className="bg-slate-500 p-2"
            >
              <form.Field
                name={question.id + '-question-' + v.id + '-answer'}
                children={(field: FieldApi<any, any, any, any, any>) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Answer Title
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              ></form.Field>
              <form.Field
                name={question.id + '-question-' + v.id + '-answer-description'}
                children={(field: FieldApi<any, any, any, any, any>) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Answer Description
                    </label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
