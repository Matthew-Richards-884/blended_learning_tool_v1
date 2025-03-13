import { Link } from '@tanstack/react-router';
import { Quizzes } from '@prisma/client';
import { ActivityTooltip } from '../Activity/ActivityTooltip';
import { useQuery } from '@tanstack/react-query';
import { getAppSession } from '../Navbar';

export const QuizCard = ({
  quizInfo,
  moduleCode,
  activity,
}: {
  moduleCode: string;
  activity: string;
  quizInfo: Quizzes & {
    _count: {
      questions: number;
    };
  };
}) => {
  const removeQuiz = () => {};
  console.log('Info: ', quizInfo);
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  return (
    <div className="relative my-0.5 flex rounded-sm bg-gray-50 p-1 text-black shadow-md">
      <div className="flex flex-col">
        <div className="">
          {quizInfo.title !== '' ? quizInfo.title : 'Untitled quiz'}
        </div>
        <div className="">
          {quizInfo.description !== ''
            ? quizInfo.description
            : 'No description'}
        </div>
        <div className="">Questions: {quizInfo._count.questions}</div>
      </div>
      <div className="ms-auto flex flex-col">
        {session?.data.userType === 'Student' ? (
          <></>
        ) : (
          <div className="flex align-top">
            <button
              onClick={() => removeQuiz()}
              className="relative flex h-min flex-row hover:cursor-pointer hover:bg-gray-200"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              <ActivityTooltip id={'RemoveQuiz'} text={'Remove Quiz'} />
            </button>
          </div>
        )}
        {session?.data.userType === 'Student' ? (
          <></>
        ) : (
          <div
            className={`hover:${session?.data.buttonHighlightColour ?? 'bg-gray-200'}`}
          >
            <Link
              to="/modules/$module/activity/$id/quiz/$quiz/edit"
              params={{ module: moduleCode, id: activity, quiz: quizInfo.id }}
              className="relative flex w-full flex-row"
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
              <ActivityTooltip
                id={quizInfo.id + '-quiz-edit'}
                text={'Edit Quiz'}
              />
            </Link>
          </div>
        )}
        <div className="hover:bg-gray-200">
          <Link
            to="/modules/$module/activity/$id/quiz/$quiz/begin"
            params={{ module: moduleCode, id: activity, quiz: quizInfo.id }}
            className="relative flex flex-row"
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
            <ActivityTooltip
              id={quizInfo.id + '-quiz-start'}
              text={'Begin Quiz'}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
