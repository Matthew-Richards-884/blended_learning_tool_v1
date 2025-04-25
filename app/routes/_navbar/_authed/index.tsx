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
import { Activities, Modules } from '@prisma/client';

export const Route = createFileRoute('/_navbar/_authed/')({
  component: HomeComponent,
});

function HomeComponent() {
  const session = useQuery({
    queryKey: ['session'],
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
  });

  // const activities = useQuery({
  //   queryKey: ['activities'],
  //   queryFn: () => getActivities(),
  // }).data;

  const activities = useQuery({
    queryKey: ['userActivities'],
    queryFn: session
      ? () =>
          getUserActivities(session.data.userEmail) as any as (Activities & {
            Modules: Modules;
          })[]
      : skipToken,
    enabled: !!session,
  });

  return (
    <div
      className={`flex h-[var(--content-height)] w-screen flex-col overflow-auto sm:grid sm:grid-cols-6 sm:overflow-hidden ${session?.data.backgroundColour} text-black`}
    >
      <Suspense>
        <div
          className={`flex flex-col sm:col-span-1 sm:block sm:overflow-auto sm:pb-20`}
        >
          <h1 className="p-1 text-center text-2xl">Modules</h1>
          <div className="flex flex-col pt-0.5">
            {modules.isSuccess ? (
              modules.data.map((v) => (
                <SidebarElement key={v.id} module={v.code}></SidebarElement>
              ))
            ) : (
              <div className="col-span-1">Loading...</div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:col-span-5 sm:block">
          <h1 className="p-1 text-center text-2xl">Activities</h1>
          <div
            className={`sm:h-[var(--element-height)] sm:overflow-auto`}
            style={
              {
                '--element-height': `calc(100vh - ${NAVBAR_HEIGHT}rem - 2.5rem)`,
              } as React.CSSProperties
            }
          >
            {activities.isSuccess ? (
              activities.data.map((v) => (
                <ActivityCard key={v.id} info={v}></ActivityCard>
              ))
            ) : (
              <div className="col-span-3">Loading...</div>
            )}
          </div>
        </div>
        {/* <div className="flex flex-col sm:col-span-2 sm:block">
          <h1 className="p-1 text-center text-2xl">Activity Manager</h1>
          <div
            className={`h-[var(--element-height)] overflow-auto`}
            style={
              {
                '--element-height': `calc(100vh - ${NAVBAR_HEIGHT}rem - 2.5rem)`,
              } as React.CSSProperties
            }
          >
            <div className="col-span-2"></div>
          </div>
        </div> */}
      </Suspense>
    </div>
  );
}
