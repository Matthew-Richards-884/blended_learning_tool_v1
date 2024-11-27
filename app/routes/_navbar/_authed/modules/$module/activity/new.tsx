import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Suspense, useState } from 'react';
import { Activities } from '@prisma/client';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createActivity } from '../../../../../../util/databaseFunctions';
import { EditActivityForm } from '../../../../../../components/Activity/EditActivityForm';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/new'
)({
  component: ActivityCreateComponent,
});

function ActivityCreateComponent() {
  const { module } = Route.useParams();
  const router = useRouter();

  const createActivityMutation = useMutation({
    mutationFn: (activity: typeof activityInfo) => createActivity(activity),
    onSuccess: async () => {
      await router.invalidate();
      router.navigate({
        to: '/modules/$module/activity/$id',
        params: { id: activityInfo.id, module: module },
      });
      return;
    },
  });

  const form = useForm({
    defaultValues: {},
    onSubmit: async () => {
      console.log('Actual value: ', activityInfo);
      const activityQuery =
        await createActivityMutation.mutateAsync(activityInfo);
      console.log(activityQuery);
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  }) as any;

  const [activityInfo, setActivityInfo] = useState({
    id: crypto.randomUUID(),
    title: '',
    description: '',
    duration: 0,
    deadline: new Date(),
    module: module,
  } as Activities);

  return (
    <div className="w-screen overflow-auto bg-slate-700 p-2 text-white">
      <Suspense>
        <EditActivityForm
          activityInfo={activityInfo}
          form={form}
          setActivityInfo={setActivityInfo}
        ></EditActivityForm>
      </Suspense>
    </div>
  );
}
