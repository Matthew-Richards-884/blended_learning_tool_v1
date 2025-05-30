import { createFileRoute, Link } from '@tanstack/react-router';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createBoard,
  deleteQuiz,
  getActivity,
  getBoardByActivity,
  getBoardByActivityGroup,
  getGroupByUserActivity,
  getQuizCardsInfo,
} from '../../../../../../../util/databaseFunctions';
import { DiscussionBoard } from '../../../../../../../components/Boards/DiscussionBoard';
import { getAppSession } from '../../../../../../../components/Navbar';
import { Tooltip } from '../../../../../../../components/Activity/Tooltip';
import { QuizCard } from '../../../../../../../components/Form/QuizCard';
import { UserType } from '@prisma/client';

export const Route = createFileRoute(
  '/_navbar/_authed/modules/$module/activity/$id/'
)({
  component: ActivityComponent,
});

function ActivityComponent() {
  const { module, id } = Route.useParams();

  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  const activity = useQuery({
    queryKey: ['id', module, id, 'ActivityComponent'],
    queryFn: () => getActivity(id),
  });

  const group = useQuery({
    queryKey: [id, 'group', session?.data.userEmail],
    queryFn:
      activity.data?.id && session?.data.userEmail
        ? () =>
            getGroupByUserActivity({
              activity: activity.data?.id!,
              email: session?.data.userEmail,
            })
        : skipToken,
    enabled: !!(activity.data?.id && session?.data.userEmail),
  });

  const board = useQuery({
    queryKey: ['board', module, id, 'ActivityComponent'],
    queryFn: group.isSuccess
      ? () => getBoardByActivityGroup({ activity: id, group: group.data?.id })
      : skipToken,
    enabled: !!group.isSuccess,
  });
  console.warn(board.data);

  const quizInfo = useQuery({
    queryKey: ['quizInfo', id],
    queryFn: () => getQuizCardsInfo(id),
  });

  const queryClient = useQueryClient();
  const removeQuizMutation = useMutation({
    mutationFn: (quizID: string) => deleteQuiz(quizID),
    onSuccess: ({ activity, id }) => {
      queryClient.invalidateQueries({ queryKey: ['quizInfo', activity] });
      quizInfo.data
        ? queryClient.setQueryData(
            ['quizInfo', activity],
            quizInfo.data.filter((q) => q.id !== id)
          )
        : undefined;
      console.log('Current', quizInfo);
      console.log(
        'Updated',
        quizInfo.data?.filter((q) => q.id !== id)
      );
    },
  });
  const removeQuiz = (quizID: string) => {
    removeQuizMutation.mutate(quizID);
  };

  const createBoardMutation = useMutation({
    mutationFn: (params: {
      title: string;
      description: string;
      defaultPrivate: boolean;
      locationID: string;
      groupID: string | undefined;
    }) =>
      createBoard({
        id: crypto.randomUUID(),
        title: params.title,
        description: params.description,
        defaultPrivate: params.defaultPrivate,
        locationType: 'Activities',
        locationID: params.locationID,
        group: params.groupID,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', module, id, 'ActivityComponent'],
      });
    },
  });

  // console.log('Activity group', activity.data);
  // console.log('Group', group.data);
  // console.log('Board', board);

  return (
    <div className="h-full w-screen overflow-auto bg-gray-200 p-2 text-black">
      {activity.isSuccess && activity.data ? (
        <div
          key={activity.data.title}
          className="flex rounded-sm bg-gray-50 p-2 text-black shadow-md"
        >
          <div className="flex-grow">
            <div>{activity.data.title}</div>
            <div>{activity.data.description}</div>
            <div>{activity.data.duration} minutes</div>
            <div>
              Due: {new Date(activity.data.deadline as any).toUTCString()}
            </div>
          </div>
          <div className="flex flex-none flex-col items-center justify-around align-middle">
            {session?.data.userType == 'Teacher' ? (
              <Link
                to="/modules/$module/activity/$id/edit"
                params={{ module: module, id: activity.data.id }}
                className="relative flex w-full flex-row hover:bg-gray-200"
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <Tooltip
                  id={activity.data.id + '-edit'}
                  text={'Edit'}
                />
              </Link>
            ) : null}
            <Link
              to="/modules/$module/activity/$id/begin"
              params={{ module: module, id: id }}
              className="relative flex w-full"
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
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
              <Tooltip
                id={activity.data.id + '-begin'}
                text={'Begin Activity'}
              />
            </Link>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          {quizInfo.data ? (
            quizInfo.data.map((q) => (
              <QuizCard
                moduleCode={module}
                activity={id}
                quizInfo={q}
                removeQuiz={removeQuiz}
                key={q.id}
              />
            ))
          ) : (
            <div>Loading Quizzes...</div>
          )}
        </div>
        {board.isSuccess && board.data ? (
          <DiscussionBoard
            boardCode={board.data.id}
            group={group ? group.data?.id : undefined}
          />
        ) : board.fetchStatus === 'idle' &&
          session?.data.userType === 'Teacher' ? (
          <button
            onClick={() =>
              createBoardMutation.mutate({
                title: 'New Board',
                description: 'New board description',
                defaultPrivate: true,
                locationID: id,
                groupID: group.data?.id,
              })
            }
            className="mt-1 mb-0.5 cursor-pointer rounded-sm bg-gray-100 px-2 shadow-md hover:bg-gray-50"
          >
            Create new board
          </button>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
