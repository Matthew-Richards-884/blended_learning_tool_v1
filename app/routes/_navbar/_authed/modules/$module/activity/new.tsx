import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/new',
)({
  component: () => (
    <div>Hello /_navbar/_authed/modules/$module/activity/new!</div>
  ),
})
