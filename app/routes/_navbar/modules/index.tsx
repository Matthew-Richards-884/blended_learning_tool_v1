import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_navbar/modules/')({
  component: ModuleComponent,
})

function ModuleComponent() {
  return (
    <div>
      Hello World
      <Outlet />
    </div>
  )
}
