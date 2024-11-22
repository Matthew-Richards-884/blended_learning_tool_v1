import { FieldApi } from '@tanstack/react-form';
import { FieldInfo } from './FieldInfo';
import { questionClass } from './EditQuizQuestion';

export const EditActivityForm = ({ activityInfo, form, setActivityInfo }) => (
  <div className="my-2 rounded-md bg-slate-500 p-2">
    <form
      onSubmit={(e) => {
        console.log('E', e);
        e.preventDefault();
        e.stopPropagation();
        console.log('FIELD INFO', form.fieldInfo);
        form.handleSubmit();
      }}
    >
      <form.Field
        name="activityTitle"
        children={(field: FieldApi<any, any, any, any, any>) => (
          <div>
            <div
              className={`${questionClass} w-3/5 border-b border-gray-300 drop-shadow-sm`}
            >
              <input
                id={field.name}
                name={field.name}
                value={activityInfo.title ?? ''}
                placeholder="Untitled Activity"
                onBlur={field.handleBlur}
                onChange={(e) =>
                  setActivityInfo({
                    ...activityInfo,
                    title: e.target.value,
                  })
                }
                className="w-full flex-1 border-0 bg-transparent py-3 pl-1 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:leading-6"
              />
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      />
      <form.Field
        name={'activityDescription'}
        children={(field: FieldApi<any, any, any, any, any>) => (
          <div>
            <div
              className={`${questionClass} w-3/5 border-b border-gray-300 drop-shadow-sm`}
            >
              <input
                id={field.name}
                name={field.name}
                value={activityInfo.description ?? ''}
                placeholder="Description"
                onBlur={field.handleBlur}
                onChange={(e) =>
                  setActivityInfo({
                    ...activityInfo,
                    description: e.target.value,
                  })
                }
                className="text-md w-full flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:leading-6"
              />
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      />
      <div className="mt-2 flex w-3/5 flex-row">
        <form.Field
          name={'activityDuration'}
          children={(field: FieldApi<any, any, any, any, any>) => (
            <div className="flex-grow">
              <label htmlFor={field.name} className="ms-1">
                Estimated duration (mins)
              </label>
              <div
                className={`${questionClass} me-3 h-min border-b border-gray-300 drop-shadow-sm`}
              >
                <input
                  id={field.name}
                  name={field.name}
                  value={activityInfo.duration ?? 0}
                  type="number"
                  min={0}
                  placeholder="Estimated duration (mins)"
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    setActivityInfo({
                      ...activityInfo,
                      duration: e.target.valueAsNumber,
                    })
                  }
                  className="text-md w-full flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:leading-6"
                />
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name={'activityDeadline'}
          children={(field: FieldApi<any, any, any, any, any>) => (
            <div className="flex-initial">
              <label htmlFor={field.name} className="ms-4">
                Deadline
              </label>
              <div
                className={`${questionClass} ms-3 border-b border-gray-300 drop-shadow-sm`}
              >
                <input
                  id={field.name}
                  name={field.name}
                  type="datetime-local"
                  step={60}
                  value={new Date(activityInfo.deadline)
                    .toISOString()
                    .slice(0, 16)}
                  placeholder="Deadline"
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    setActivityInfo({
                      ...activityInfo,
                      deadline: e.target.valueAsDate ?? new Date(),
                    })
                  }
                  className="text-md w-full flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:leading-6"
                />
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        />
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
