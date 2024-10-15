import { createFileRoute } from '@tanstack/react-router'
import { database } from '../../../../database/database'

export const Route = createFileRoute('/_navbar/modules/$module/')({
  component: ModuleComponent,
})

function ModuleComponent() {
  const { module } = Route.useParams()
  const moduleData = database.modules[module]
  return (<div className='p-2 bg-slate-700 text-white w-screen overflow-auto'>
    <h1>{module}</h1>
    <h2>{moduleData.title}</h2>
    <p>{moduleData.description}</p>
    <h2>Lectures</h2>
    {Object.values(moduleData.lectures).map((v: any) => <div className='bg-slate-500 rounded-md my-2 p-2'>
      <p>{v.name}</p>
      <p>{v.description}</p>
      <p>{v.link}</p>
    </div>)}
    <h2>Activities</h2>
    {Object.values(moduleData.activities).map((v: any) => <div className='bg-slate-500 rounded-md my-2 p-2'>
      <p>{v.name}</p>
      <p>{v.description}</p>
      <p>{v.duration} minutes</p>
      <p>{v.deadline}</p>
      <p>{v.link}</p>
    </div>)}
  </div>)
}
