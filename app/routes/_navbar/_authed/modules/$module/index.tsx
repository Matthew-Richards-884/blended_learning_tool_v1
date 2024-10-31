import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { PrismaClient } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import {
  getActivitiesByModule,
  getModule,
} from '../../../../../util/databaseFunctions'

export const Route = createFileRoute('/_navbar/_authed/modules/$module/')({
  component: ModuleComponent,
})

function ModuleComponent() {
  const { module } = Route.useParams()

  const moduleData = useQuery({
    queryKey: ['moduleData', module],
    queryFn: () => getModule(module),
  }).data

  const activities = useQuery({
    queryKey: ['activitiesByModule', module],
    queryFn: () => getActivitiesByModule(module),
  }).data

  return (
    <div className="w-screen overflow-auto bg-slate-700 p-2 text-white">
      <h1>{module}</h1>
      <h2>{moduleData?.title}</h2>
      <p>{moduleData?.description}</p>
      {/* <h2>Lectures</h2>
      {Object.values(moduleData?.lectures).map((v: any) => (
        <div className="my-2 rounded-md bg-slate-500 p-2">
          <p>{v.name}</p>
          <p>{v.description}</p>
          <p>{v.link}</p>
        </div>
      ))} */}
      <h2>Activities</h2>
      {activities?.map((v: any) => (
        <div className="my-2 rounded-md bg-slate-500 p-2">
          <p>{v.name}</p>
          <p>{v.description}</p>
          <p>{v.duration} minutes</p>
          <p>{v.deadline}</p>
          <p>{v.link}</p>
        </div>
      ))}
    </div>
  )
}
