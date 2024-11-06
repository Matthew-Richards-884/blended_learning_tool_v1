import { FieldApi } from '@tanstack/react-form';
import { FieldInfo } from './FieldInfo';
import { z } from 'zod';

export type formType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

type questionInfo = {
  QuizQuestionAnswers: {
    id: number;
    title: string;
    description: string | null;
    question: number | null;
  }[];
  id: number;
  title: string;
  description: string | null;
  type: string;
  quiz: number | null;
};

export function QuizQuestion({
  form,
  questionInfo,
}: {
  form: any;
  questionInfo: questionInfo;
}) {
  return (
    <div className="mt-3 p-2" key={'Question:' + questionInfo.id}>
      <form.Field
        name={questionInfo.title}
        validators={{
          // onChange: z.string().min(3, 'First name must be at least 3 characters'),
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: z.string().refine(
            async (value) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return !value.includes('error');
            },
            {
              message: "No 'error' allowed in field",
            }
          ),
        }}
        children={(field: FieldApi<any, any, any, any, any>) =>
          questionInfo.type === 'text' ? (
            <>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {questionInfo.title}
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <FieldInfo field={field} />
            </>
          ) : (
            <>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                {questionInfo.title}
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {questionInfo.description}
              </p>
              <div className="mt-6 space-y-6" role="radiogroup">
                {questionInfo.QuizQuestionAnswers.map((answer) => (
                  <div
                    className="flex items-center gap-x-3"
                    key={'Answer:' + answer.id}
                  >
                    <input
                      id={
                        'question-' + questionInfo.id + ':answer-' + answer.id
                      }
                      value={answer.id}
                      onChange={(e) => field.handleChange(e.target.value)}
                      name={questionInfo.title}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor={
                        'question-' + questionInfo.id + ':answer-' + answer.id
                      }
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {answer.title}
                    </label>
                  </div>
                ))}
                <FieldInfo field={field} />
              </div>
            </>
          )
        }
      />
    </div>
  );
}
