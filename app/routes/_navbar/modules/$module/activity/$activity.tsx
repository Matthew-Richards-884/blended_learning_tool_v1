import { createFileRoute } from '@tanstack/react-router';
import { database } from '../../../../../database/database';

export const Route = createFileRoute(
  '/_navbar/modules/$module/activity/$activity'
)({
  component: ActivityComponent,
});

function ActivityComponent() {
  const { module, activity } = Route.useParams();
  const moduleData = database.modules[module];
  console.log(activity)
  const v = moduleData.activities[activity];
  return (
    <div className="w-screen overflow-auto bg-slate-700 p-2 text-white">
      <div className="my-2 rounded-md bg-slate-500 p-2">
        <p>{v.name}</p>
        <p>{v.description}</p>
        <p>{v.duration} minutes</p>
        <p>{v.deadline}</p>
        <p>{v.link}</p>
      </div>
    </div>
  );
}
