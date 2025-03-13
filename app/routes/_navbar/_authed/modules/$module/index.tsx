import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import {
  Activities,
  Board,
  Post,
  PrismaClient,
  UserType,
} from '@prisma/client';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createBoard,
  getActivitiesByModule,
  getBoard,
  getBoardByModule,
  getBoardInfoByModule,
  getModule,
} from '../../../../../util/databaseFunctions';
import { getAppSession } from '../../../../../components/Navbar';
import { ActivityDisplay } from '../../../../../components/Activity/ActivityDisplay';
import { ActivityTooltip } from '../../../../../components/Activity/ActivityTooltip';
import { DiscussionBoard } from '../../../../../components/Boards/DiscussionBoard';

export const Route = createFileRoute('/_navbar/_authed/modules/$module/')({
  component: ModuleComponent,
});

function ModuleComponent() {
  const { module } = Route.useParams();

  const moduleData = useQuery({
    queryKey: ['moduleData', module],
    queryFn: () => getModule(module),
  }).data;

  const activities: Activities[] | undefined = useQuery({
    queryKey: ['activitiesByModule', module],
    queryFn: () => getActivitiesByModule(module) as any as Activities[],
  }).data;

  const boardInfo = useQuery({
    queryKey: ['boardInfoModule', module],
    queryFn: moduleData?.id
      ? () => getBoardInfoByModule(moduleData?.id)
      : skipToken,
    enabled: !!moduleData?.id,
  });

  const queryClient = useQueryClient();

  const createBoardMutation = useMutation({
    mutationFn: (params: {
      title: string;
      description: string;
      defaultPrivate: boolean;
      locationID: string;
    }) =>
      createBoard({
        id: crypto.randomUUID(),
        title: params.title,
        description: params.description,
        defaultPrivate: params.defaultPrivate,
        locationType: 'Modules',
        locationID: params.locationID,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardInfoModule', module] });
    },
  });

  console.log('Board info', boardInfo);

  activities ? console.log('DATE', activities[0].deadline) : null;

  return (
    <div className="w-screen overflow-auto bg-violet-200 p-2 text-black">
      <div className="my-2 flex flex-row bg-slate-50 p-2 shadow-md">
        <div className="flex-grow">
          <div className="flex flex-row">
            <h1 className="pe-2">{module}</h1>
            <h2 className="ps-2">{moduleData?.title}</h2>
          </div>
          <div>
            <p className="text-sm text-gray-600">{moduleData?.description}</p>
          </div>
          <div>
            {boardInfo.isSuccess &&
            boardInfo.data?.id === undefined &&
            moduleData?.id ? (
              <div>
                <button
                  onClick={() =>
                    createBoardMutation.mutate({
                      title: 'New Board',
                      description: 'New board description',
                      defaultPrivate: true,
                      locationID: moduleData.id,
                    })
                  }
                >
                  Create new board
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Link
          className="relative flex flex-initial items-center"
          to="/modules/$module/activity/new"
          params={{ module: module }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="peer size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <ActivityTooltip id="create-activity" text={'Create Activity'} />
        </Link>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          {activities?.map((v) => <ActivityDisplay module={module} v={v} />)}
        </div>
        <div className="col-span-2">
          <div>
            {boardInfo.data?.id ? (
              <DiscussionBoard boardCode={boardInfo.data.id} />
            ) : (
              <div>Loading board...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
