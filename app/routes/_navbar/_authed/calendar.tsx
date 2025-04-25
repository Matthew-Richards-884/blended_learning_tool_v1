import { skipToken, useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getAppSession } from '../../../components/Navbar';
import { Activities, Modules } from '@prisma/client';
import { Suspense, useEffect, useState } from 'react';
import { ActivityCard } from '../../../components/Activity/ActivityCard';
import { SidebarElement } from '../../../components/SidebarElement';
import {
  getUserActivities,
  getUserModules,
} from '../../../util/databaseFunctions';
import { NAVBAR_HEIGHT } from '../../_navbar';

export const Route = createFileRoute('/_navbar/_authed/calendar')({
  component: () => CalendarComponent(),
});

function CalendarComponent() {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  const modules = useQuery({
    queryKey: ['userModules'],
    queryFn: session ? () => getUserModules(session.data.userEmail) : skipToken,
    enabled: !!session,
  });

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

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(2025);

  const setMonthYear = (newMonth: number) => {
    if (newMonth < 0) {
      setMonth(newMonth + 12);
      setYear(year - 1);
    } else if (newMonth >= 12) {
      setMonth(newMonth - 12);
      setYear(year + 1);
    } else {
      setMonth(newMonth);
    }
  };

  const CalendarTiles = () => {
    const numDays = new Date(year, month + 1, 0).getDate();
    const days: Date[] = Array.from(
      { length: numDays },
      (_, index) => new Date(year, month, index + 1)
    );

    const startDay = (((days[0].getDay() - 1) % 7) + 7) % 7;
    const preDays: Date[] = [];
    console.log('Start day', startDay);
    for (let i = 1; i <= startDay; i++) {
      preDays.push(new Date(new Date(days[0]).setDate(days[0].getDate() - i)));
    }
    preDays.reverse();
    const endDay = (((days[days.length - 1].getDay() - 1) % 7) + 7) % 7;
    console.log(days[days.length - 1]);
    const overFill = startDay + numDays + (7 - endDay - 1) <= 35;
    console.log(startDay + numDays + (7 - endDay) - 1);
    const postDays: Date[] = [];
    console.log('End day', endDay);
    for (let i = 1; i < (overFill ? 14 - endDay : 7 - endDay); i++) {
      postDays.push(
        new Date(
          new Date(days[days.length - 1]).setDate(
            days[days.length - 1].getDate() + i
          )
        )
      );
    }
    console.log('Pre days', preDays);
    console.log('Post days', postDays);

    console.log('Days', days);

    const calendarElementDateClass = 'relative flex h-6 justify-end';

    const DateElement = ({ date }) => (
      <p
        className={`absolute ${new Date().toISOString().slice(0, 10) == date.toISOString().slice(0, 10) ? 'size-6 rounded-full bg-sky-300 me-1 ps-1' : 'px-2'}`}
      >
        {date.getDate()}
      </p>
    );

    return (
      <div className="grid h-[calc(var(--element-height)-3rem)] grid-cols-7 grid-rows-6">
        {preDays.map((v) => (
          <div
            key={v.toString()}
            className={`bg-gray-200 text-gray-600 ${calendarElementClass}`}
          >
            <div className={calendarElementDateClass}>
              <DateElement date={v} />
            </div>
          </div>
        ))}
        {days.map((v) => (
          <div
            key={v.toString()}
            className={`bg-gray-100 ${calendarElementClass}`}
          >
            <div className={calendarElementDateClass}>
              <DateElement date={v} />
            </div>
            {activities.data
              ?.filter((b) => {
                return (
                  new Date(b.deadline).toISOString().slice(0, 10) ==
                  v.toISOString().slice(0, 10)
                );
              })
              .map((f) => (
                <div key={f.id}>
                  <Link
                    className="relative my-0.5 flex flex-initial items-center rounded-sm bg-slate-300 px-0.5 text-sm hover:bg-slate-200"
                    to="/modules/$module/activity/$id"
                    params={{ module: f.module!, id: f.id }}
                  >
                    {f.title}
                  </Link>
                </div>
              ))}
          </div>
        ))}
        {postDays.map((v) => (
          <div
            key={v.toString()}
            className={`bg-gray-200 text-gray-600 ${calendarElementClass}`}
          >
            <div className={calendarElementDateClass}>
              <DateElement date={v} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const calendarElementClass = 'm-0.5 p-0.5 rounded-sm';

  console.log('Activities', activities.data);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayClass = `flex justify-end bg-gray-200 text-gray-600 ${calendarElementClass}`;

  return (
    <div className="grid h-[var(--content-height)] w-screen grid-cols-6 bg-slate-200 text-black">
      <Suspense>
        <div className="w-screen">
          <div className="flex h-10">
            <h1 className="flex grow p-1 text-center text-2xl font-semibold">
              {monthNames[month]} {year}
            </h1>
            <div className="flex h-8 justify-center justify-items-center">
              <button
                onClick={() => setMonthYear(month - 1)}
                className="my-1 cursor-pointer rounded-md border border-gray-300 shadow-lg hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setMonth(new Date().getMonth());
                  setYear(new Date().getFullYear());
                }}
                className="my-1 flex cursor-pointer rounded-md border border-gray-300 px-3 shadow-lg hover:bg-slate-100"
              >
                <span className="self-center text-sm">Today</span>
              </button>
              <button
                onClick={() => setMonthYear(month + 1)}
                className="my-1 cursor-pointer rounded-md border border-gray-300 shadow-lg hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`h-[var(--element-height)] overflow-auto`}
            style={
              {
                '--element-height': `calc(100vh - ${NAVBAR_HEIGHT}rem - 2.5rem)`,
              } as React.CSSProperties
            }
          >
            <div className="grid grid-cols-7">
              <div className={dayClass}>
                <p>Mon</p>
              </div>
              <div className={dayClass}>
                <p>Tue</p>
              </div>
              <div className={dayClass}>
                <p>Wed</p>
              </div>
              <div className={dayClass}>
                <p>Thu</p>
              </div>
              <div className={dayClass}>
                <p>Fri</p>
              </div>
              <div className={dayClass}>
                <p>Sat</p>
              </div>
              <div className={dayClass}>
                <p>Sun</p>
              </div>
            </div>
            <CalendarTiles />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
