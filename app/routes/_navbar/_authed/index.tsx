import { createFileRoute } from '@tanstack/react-router';
import { SidebarElement } from '../../../components/SidebarElement';
import { ActivityCard } from '../../../components/Activity/ActivityCard';
import { NAVBAR_HEIGHT } from '../../_navbar';
import { ActivityForm } from '../../../components/Activity/ActivityForm';

import {
  getActivities,
  getModules,
  getUserActivities,
  getUserModules,
} from '../../../util/databaseFunctions';
import { skipToken, useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { getAppSession } from '../../../components/Navbar';

export const Route = createFileRoute('/_navbar/_authed/')({
  component: HomeComponent,
});

function HomeComponent() {
  const session = useQuery({
    queryKey: ['session', 'main'],
    queryFn: () => getAppSession(),
  }).data;

  // const modules = useQuery({
  //   queryKey: ['modules'],
  //   queryFn: () => getModules(),
  // }).data

  const modules = useQuery({
    queryKey: ['userModules'],
    queryFn: session ? () => getUserModules(session.data.userEmail) : skipToken,
    enabled: !!session,
  }).data;

  // const activities = useQuery({
  //   queryKey: ['activities'],
  //   queryFn: () => getActivities(),
  // }).data;

  const activities = useQuery({
    queryKey: ['userActivities'],
    queryFn: session
      ? () => getUserActivities(session.data.userEmail)
      : skipToken,
    enabled: !!session,
  }).data;

  return (
    <Suspense>
      <div
        className={`col-span-1 h-[var(--sidebar-height)] overflow-auto bg-slate-400 pb-20`}
      >
        <p>Modules</p>
        <div>
          {modules?.map((v) => (
            <SidebarElement key={v.id} module={v.code}></SidebarElement>
          ))}
        </div>
      </div>
      <div className="col-span-2 h-[var(--sidebar-height)] bg-slate-300 text-black">
        <h1 className="bg-slate-400 p-1 text-center text-2xl">Activities</h1>
        <div
          className={`h-[var(--element-height)] overflow-auto`}
          style={
            {
              '--element-height': `calc(100vh - ${NAVBAR_HEIGHT}rem - 2.5rem)`,
            } as React.CSSProperties
          }
        >
          {activities?.map((v) => (
            <ActivityCard
              key={v.id}
              name={v.title}
              action={v.id}
              moduleCode={v.module ? v.module : 'ERROR'}
              deadline={new Date(v.deadline as any)}
            ></ActivityCard>
          ))}
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
          <div className="text-black"></div>
        </div>
      </div>
    </Suspense>
  );
}
