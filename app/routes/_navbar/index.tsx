import { createFileRoute } from '@tanstack/react-router';
import { SidebarElement } from '../../components/SidebarElement';
import { ActivityCard } from '../../components/ActivityCard';
import { NAVBAR_HEIGHT } from '../_navbar';
import { database } from '../../database/database';
import { ActivityForm } from '../../components/ActivityForm';

export const Route = createFileRoute('/_navbar/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <div
        className={`col-span-1 h-[var(--sidebar-height)] overflow-auto bg-slate-400 pb-20`}
      >
        Modules
        {Object.keys(database.modules).map((k) => (
          <SidebarElement module={k}></SidebarElement>
        ))}
      </div>
      <div className="col-span-2 h-[var(--sidebar-height)] bg-slate-700 text-white">
        <h1 className="p-1 text-center text-2xl">Activities</h1>
        <div
          className={`h-[var(--element-height)] overflow-auto`}
          style={
            {
              '--element-height': `calc(100vh - ${NAVBAR_HEIGHT}rem - 2.5rem)`,
            } as React.CSSProperties
          }
        >
          {Object.entries(database.modules).map(([k, v]) =>
            Object.entries(v.activities).map(([activity, a]) => (
              <ActivityCard
                name={a.name}
                action={activity}
                moduleCode={k}
                deadline={new Date(a.deadline)}
              ></ActivityCard>
            ))
          )}
        </div>
      </div>
      <div className="col-span-2 h-[var(--sidebar-height)] bg-slate-700 text-white">
        <h1 className="p-1 text-center text-2xl">Activity Manager</h1>
        <div
          className={`h-[var(--element-height)] overflow-auto`}
          style={
            {
              '--element-height': `calc(100vh - ${NAVBAR_HEIGHT}rem - 2.5rem)`,
            } as React.CSSProperties
          }
        >
          <div className='text-black'>
            <ActivityForm></ActivityForm>
          </div>
          
        </div>
      </div>
    </>
  );
}
