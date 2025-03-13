import {
  FieldApi,
  FormApi,
  ReactFormApi,
  Validator,
} from '@tanstack/react-form';
import { FieldInfo } from '../FieldInfo';
import { ZodType, ZodTypeDef } from 'zod';
import { question } from './EditQuizForm';

export const questionClass =
  'flex focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 transition-all';
export const innerQuestionClass =
  'border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:leading-6';

const FormInput = ({
  form,
  name,
  placeholder,
  outerClass,
  innerClass,
  type = 'text',
  wrapperClass = '',
  WrapperFragment = () => <></>,
}: {
  form: formType;
  name: any;
  placeholder: string;
  outerClass: string;
  innerClass: string;
  type?: React.HTMLInputTypeAttribute;
  wrapperClass?: string;
  WrapperFragment?: () => JSX.Element;
}) => (
  <form.Field
    name={name}
    children={(field) => (
      <div className={wrapperClass}>
        <WrapperFragment />
        <div className={outerClass}>
          <input
            id={field.name}
            name={field.name}
            value={field.state.value ?? ''}
            placeholder={placeholder}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            className={innerClass}
            type={type}
          />
        </div>
        <FieldInfo field={field} />
      </div>
    )}
  ></form.Field>
);

type formType = FormApi<
  {
    questions: question[];
  },
  Validator<unknown, ZodType<any, ZodTypeDef, any>>
> &
  ReactFormApi<
    {
      questions: question[];
    },
    Validator<unknown, ZodType<any, ZodTypeDef, any>>
  >;

export function EditQuizQuestion({
  form,
  index,
  question,
}: {
  form: formType;
  index: number;
  question: question;
}) {
  return (
    <div
      className="mt-3 flex w-full flex-col rounded-md bg-slate-50 p-3"
      key={'Question-' + index}
    >
      <FormInput
        form={form}
        placeholder="Question"
        name={`questions[${index}].title`}
        outerClass={`${questionClass} w-3/5 border-b border-gray-300 drop-shadow-sm`}
        innerClass={`w-full flex-1 text-xl ${innerQuestionClass}`}
      />
      <FormInput
        form={form}
        placeholder="Description"
        name={`questions[${index}].description`}
        outerClass={`${questionClass} flex-grow border-b border-gray-300 drop-shadow-sm`}
        innerClass={`flex-grow text-sm ${innerQuestionClass}`}
      />
      <form.Field
        name={`questions[${index}].QuizQuestionAnswers`}
        mode="array"
        children={(answerField) =>
          answerField.state.value.map((_, answerIndex) => (
            <div>
              <FormInput
                form={form}
                placeholder="Answer Title"
                name={`questions[${index}].QuizQuestionAnswers[${answerIndex}].title`}
                outerClass={`${questionClass} border-b border-gray-300 drop-shadow-sm flex-grow`}
                innerClass={`flex-1 text-md ${innerQuestionClass}`}
                wrapperClass={
                  question.type == 'radio'
                    ? 'flex flex-row flex-grow align-middle'
                    : ''
                }
                WrapperFragment={
                  question.type == 'radio'
                    ? () => (
                        <div className="flex flex-initial">
                          <div className="self-center">
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
                      )
                    : () => <></>
                }
              />
              <FormInput
                form={form}
                placeholder="Answer Description"
                name={`questions[${index}].QuizQuestionAnswers[${answerIndex}].description`}
                outerClass={`${questionClass} border-b border-gray-300 drop-shadow-sm flex-grow`}
                innerClass={`flex-1 text-sm ${innerQuestionClass}`}
                wrapperClass={
                  question.type == 'radio'
                    ? 'flex flex-row flex-grow align-middle ms-5'
                    : ''
                }
              />
            </div>
          ))
        }
      />

      {/* <button
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
          </button> */}
    </div>
  );
}
