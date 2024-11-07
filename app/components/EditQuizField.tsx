import { z } from 'zod';
import { QuestionInfo } from './QuizQuestion';
import { FieldApi } from '@tanstack/react-form';
import { FieldInfo } from './FieldInfo';

export type QuizFieldInfo = {
  id: number;
  title: string;
};

export function EditQuizField({
  form,
  fieldInfo,
}: {
  form: any;
  fieldInfo: QuizFieldInfo;
}) {
  return (
    <form.Field
      name={fieldInfo.id}
      validators={{
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
      children={(field: FieldApi<any, any, any, any, any>) => (
        <div>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {fieldInfo.title}
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
        </div>
      )}
    ></form.Field>
  );
}
