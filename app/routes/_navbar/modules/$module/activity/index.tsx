import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_navbar/modules/$module/activity/')({
  component: ActivityComponent,
})

function ActivityComponent() {
  return <div>Hello Activity</div>
}